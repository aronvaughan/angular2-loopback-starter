#!/bin/sh

###################################
# VARIABLES FOR ALL USERS OF BASHUTILS
# DEV AND CLIENTS
###################################
#export BASH_UTILS_HOME=`pwd`
echo deploy-local: BASH_UTILS_HOME ${BASH_UTILS_HOME}
export BASH_UTILS_ENV=stg
echo deploy-local: Environment $BASH_UTILS_ENV
export DEBUG=1

############
# start everything
#############
echo deploy_local: loading ${BASH_UTILS_HOME}/lib/init.sh
source ${BASH_UTILS_HOME}/lib/init.sh



