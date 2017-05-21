#!/bin/sh

##export USING_BASH_UTILS=~/Content/Code/restapp/bash-utils2

echo "sourcing required settings"
source ./bin/required-settings.sh

echo "init.sh deploying bashutils"
cd ${BASH_UTILS_HOME}
source ./deploy-local.sh
cd -

export CONFIG_DIR=./config/env
source $BASH_UTILS_HOME/rerun-modules/env/lib/environment-helper.sh
scrub_config
echo "loading env..."
source $BASH_UTILS_HOME/rerun-modules/env/lib/load.sh
echo "printing env..."
source $BASH_UTILS_HOME/rerun-modules/env/lib/print.sh

#source ./bin/init-env.sh
#rerun env:load --config_dir ./config/env
#rerun env:print --config_dir ./config/env

##echo "init.sh deploying bashutils"
##cd ${BASH_UTILS_HOME}
##source ./deploy-local.sh
##cd -
#TODO NO LONGER NEEDED!! source ~/.bashutils/init.sh
#TODO DELETE? export CONFIG_DIR=./config
#TODO FIXME: init_env

