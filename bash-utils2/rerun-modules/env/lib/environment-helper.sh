# NOTE - this runs outside of rerun context, DO NOT USE RERUN FUNCTIONS (WHICH EXIT) UNLESS CALLING RERUN_BINARY

echo "sourcing ${BASH_UTILS_HOME}/rerun-modules/cmdline/lib/command_utils.sh"
source ${BASH_UTILS_HOME}/rerun-modules/cmdline/lib/command_utils.sh

function scrub_config {
  echo "cleaning environment env variables..."
  unset ENV_CONFIGED
  unset ENV_VALUE
}

#######################################################################
# load a configuration file based on environment
#
# pre-set variables:
#  config.sh - if present will be used to get the values from
#
# arguments:
#   arg 1 -  the user to user to connect remotely
#
# return:
#    ACTIVE_USER - will have the user to use
#    ACTIVE_USER_PASS - will have the password to use - will be unset if the config.sh is not present
########################################################################
function read_config_based_on_env {

   if [[ -z "$ENV_CONFIGED" ]]; then

      rerun message:msg_ok --msg "config loading from dir: $CONFIG_DIR"

      rerun message:msg_ok --msg "Reading default config: $CONFIG_DIR/default.sh"
      check_for_file_exists $CONFIG_DIR/default.sh
      if [[ $? -eq 0 ]]; then
          source ${CONFIG_DIR}/default.sh
      else
           rerun message:msg_err --msg "WARN: you should have a default.sh file in the config directory ${CONFIG_DIR}"
      fi

      if [[ -z "$ENV_VALUE" ]]; then
          rerun message:msg_err --msg "ERROR: you should have a default.sh file that exports a variable ENV_VALUE that corresponds to a specific environment, or you should define this value"
          return 1
      fi

      rerun message:msg_ok --msg "Reading ${CONFIG_DIR}/${ENV_VALUE}.sh config...."
      check_for_file_exists ${CONFIG_DIR}/${ENV_VALUE}.sh
      if [[ $? -eq 0 ]]; then
          source ${CONFIG_DIR}/${ENV_VALUE}.sh
      else
          rerun message:msg_ok --msg "INFO: you can put environment specific settings ${CONFIG_DIR}/${ENV_VALUE}.sh file in the config directory"
      fi

      rerun message:msg_ok --msg "Reading $ENV_VALUE.override config...."
      check_for_file_exists ${CONFIG_DIR}/${ENV_VALUE}.override.sh
      if [[ $? -eq 0 ]]; then
          source ${CONFIG_DIR}/${ENV_VALUE}.override.sh
      else
          rerun message:msg_ok --msg  "INFO: you can put secrets in a ${CONFIG_DIR}/${ENV_VALUE}.override.sh file in the config directory"
      fi

      #we are now configured, don't need to configure again
      export ENV_CONFIGED=1
   fi
}



function print_environment_variable_names {
      check_for_file_exists $1
      if [[ $? -eq 0 ]]; then
          cat $1 | awk '!/^($|[:space:]*#|[:space:]*echo)/ {split($0,a,"=");
                                          #print a[1];
                                          split(a[1],b," ");
                                          variableName=b[2];
                                          #print b[2];
                                          print "env " variableName;
                                          }'
      fi

}
function print_environment_variables {
      check_for_file_exists $1
      if [[ $? -eq 0 ]]; then
          cat $1 | awk '!/^($|[:space:]*#|[:space:]*echo)/ {split($0,a,"=");
                                          #print a[1];
                                          split(a[1],b," ");
                                          variableName=b[2];
                                          #print b[2];
                                          #print "env " variableName;
                                          #print "env2 " ENVIRON[variableName];
                                          print variableName " ====> " ENVIRON[variableName];
                                          }'
      fi

}

    function print_config_based_on_env {

    #if [[ -z "$ENV_CONFIGED" ]]; then
    #   read_config_based_on_env
    #fi
      check_for_file_exists ${CONFIG_DIR}/default.sh
      if [[ $? -eq 0 ]]; then
         rerun terminal:cmd-banner-start
         echo "printing default config: ${CONFIG_DIR}/default.sh"
         rerun terminal:cmd-title-line
         print_environment_variables ${CONFIG_DIR}/default.sh
         rerun terminal:cmd-banner-end
      fi

      check_for_file_exists ${CONFIG_DIR}/${ENV_VALUE}.sh
      if [[ $? -eq 0 ]]; then
         rerun terminal:cmd-banner-start
         echo "printing env config: ${CONFIG_DIR}/${ENV_VALUE}.sh"
         rerun terminal:cmd-title-line
         print_environment_variables ${CONFIG_DIR}/${ENV_VALUE}.sh
         rerun terminal:cmd-banner-end
       fi

      check_for_file_exists ${CONFIG_DIR}/${ENV_VALUE}.override.sh
      if [[ $? -eq 0 ]]; then
         rerun terminal:cmd-banner-start
         echo "overrides: ${CONFIG_DIR}/${ENV_VALUE}.override.sh"
         rerun terminal:cmd-title-line
         print_environment_variable_names ${CONFIG_DIR}/${ENV_VALUE}.override.sh
         rerun terminal:cmd-banner-end
      fi
}

