#!/bin/sh

export CONFIG_DIR=./config

function scrub_env_init {
  msg_debug "cleaning environment env variables..."
  unset ENV_LOWER
  unset ENV_UPPER
  unset ENV_ANSWER
  unset ENV_CONFIG_READ
  unset ANSWER
}

#######################################################################
# load a configuration file based on environment
#
# pre-set variables:
#  default.sh - if present will be used to get the values from
#
########################################################################
function read_config_based_on_env {

   if [[ -z "$ENV_CONFIG_READ" ]]; then

      echo "PWD"
      echo `pwd`
      msg_debug "Reading default config...."
      check_for_file_exists ./config/default.sh
      if [[ $FILE_EXISTS -eq 1 ]]; then
          source ${CONFIG_DIR}/default.sh
      else
          msg_warn "WARN: you should have a default.sh file in the config directory ${CONFIG_DIR}"
      fi

      msg_debug "Reading $ENV_LOWER config...."
      check_for_file_exists ${CONFIG_DIR}/${ENV_LOWER}.sh
      if [[ $FILE_EXISTS -eq 1 ]]; then
          source ${CONFIG_DIR}/${ENV_LOWER}.sh
      else
          msg_info "INFO: you can put environment specific seetings ${CONFIG_DIR}/${ENV_LOWER}.sh file in the config directory"
      fi

      msg_debug "Reading $ENV_LOWER.override config...."
      check_for_file_exists ${CONFIG_DIR}/${ENV_LOWER}.override.sh
      if [[ $FILE_EXISTS -eq 1 ]]; then
          source ${CONFIG_DIR}/${ENV_LOWER}.override.sh
      else
          msg_info "INFO: you can put secrets in a ${CONFIG_DIR}/${ENV_LOWER}.override.sh file in the config directory"
      fi


   fi
}

function print_environment_variables {
     check_for_file_exists $1
      if [[ $FILE_EXISTS -eq 1 ]]; then
          cat $1 | awk '{split($0,a,"=");
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

function print_environment_variable_names {
     check_for_file_exists $1
      if [[ $FILE_EXISTS -eq 1 ]]; then
          cat $1 | awk '{split($0,a,"=");
                                          #print a[1];
                                          split(a[1],b," ");
                                          variableName=b[2];
                                          #print b[2];
                                          print "env " variableName;
                                          }'
      fi

}

function print_config_based_on_env {
      command_banner_start
      echo "printing default config...."
      command_title_line
      print_environment_variables ${CONFIG_DIR}/default.sh
      command_banner_end

      command_banner_start
      echo "printing env config...."
      command_title_line
      print_environment_variables ${CONFIG_DIR}/${ENV_LOWER}.sh
      command_banner_end

      command_banner_start
      echo "overrides...."
      command_title_line
      print_environment_variable_names ${CONFIG_DIR}/${ENV_LOWER}.override.sh
      command_banner_end
}

function prompt_for_env {

    prompt_for_variable ENV_ANSWER "What environment to use? (dev) {dev|tst|stg|prd" dev
    if [ -n "$ENV_ANSWER" ]; then
       echo "env answer ${ENV_ANSWER}"
       while true; do
       case "$ENV_ANSWER" in
           dev) ENV_UPPER=DEV
                ENV_LOWER=dev

                break;
                ;;
           tst) ENV_UPPER=TST
                ENV_LOWER=tst

                break;
                ;;
           stg) ENV_UPPER=STG
                ENV_LOWER=stg

                break;
                ;;
           prd) ENV_UPPER=PRD
                ENV_LOWER=prd
                break;
                ;;
           [Qq]*) exit;;
       esac
       done
       echo "using env ${ENV_UPPER} ${ENV_LOWER}"
    fi
}

function prompt_for_env_lower {
    #prompt_for_sudo_homeaway
    if [[ -z "${ENV_LOWER}" ]]; then
        DEFAULT='tst'
        prompt_for_variable ENV_LOWER "Which environments do we want to find mongo instances for? (tst, stg, prd)" tst
        ENV_LOWER=$ANSWER
        DEFAULT=''
    else
        ANSWER=${ENV_LOWER}
    fi
}

function init_env() {
   #set env
   prompt_for_env

   #read env properties
   read_config_based_on_env
   print_config_based_on_env
}

scrub_env_init
