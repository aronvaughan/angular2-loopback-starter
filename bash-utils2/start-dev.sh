#!/bin/sh

###################################
# VARIABLES FOR ALL USERS OF BASHUTILS
# DEV AND CLIENTS
###################################
export BASH_UTILS_HOME=`pwd`
echo start-dev: BASH_UTILS_HOME ${BASH_UTILS_HOME}
export BASH_UTILS_ENV=dev
echo start-dev: Environment $BASH_UTILS_ENV
export DEBUG=1
export LOG_LEVEL=debug
echo start-dev: setting log level to $LOG_LEVEL

############
# start everything
#############
echo start-dev: loading /lib/init.sh
source ${BASH_UTILS_HOME}/lib/init.sh
