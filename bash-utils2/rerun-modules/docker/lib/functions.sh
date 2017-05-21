# Shell functions for the docker module.
#/ usage: source RERUN_MODULE_DIR/lib/functions.sh command
#

# Read rerun's public functions
. $RERUN || {
    echo >&2 "ERROR: Failed sourcing rerun function library: \"$RERUN\""
    return 1
}

# Check usage. Argument should be command name.
[[ $# = 1 ]] || rerun_option_usage

# Source the option parser script.
#
if [[ -r $RERUN_MODULE_DIR/commands/$1/options.sh ]] 
then
    . $RERUN_MODULE_DIR/commands/$1/options.sh || {
        rerun_die "Failed loading options parser."
    }
fi

# - - -
# Your functions declared here.
# - - -

#rerun stubbs:add-command --command install-image --module docker
#rerun stubbs:add-option --option image --command install-image --module docker

#set log level based on calling environment
LEVEL=`rerun_log level $LOG_LEVEL`
#echo set logleve is $LEVEL


function check_docker_installed {
   rerun cmdline:command_exists --command docker
   if (($? != 0)); then
      rerun_die "docker:install-image docker does not exist!!! install docker"
   else
      rerun_log debug "docker:install-image docker is installed"
   fi
   return 0
}

function check_docker_image_exists {
   check_docker_installed
   rerun_log debug "docker:install-image checking for docker image ${IMAGE}"
   IMAGES=`docker images`
   rerun_log debug $IMAGES
   EXISTS=0
   if [[ $IMAGES =~ ($IMAGE) ]]; then
      rerun_log info "docker:install-image image exists"
      EXISTS=0
   else
      rerun_log info "docker:install-image image does not exist!"
      EXISTS=1
   fi
   #echo exists ${EXISTS}
   return $EXISTS
}

function install_docker_image_if_needed {
   #echo start
   check_docker_image_exists
   EXISTS=$?
   #echo back ${EXISTS}
   if [[ $EXISTS -ne 0 ]]; then
      rerun_log info "docker:install-image docker image $IMAGE"
      docker pull $IMAGE
   else
      rerun_log info "docker:install-image docker image $IMAGE installed"
   fi
   return 0
}

