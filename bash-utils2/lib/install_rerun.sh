#!/bin/sh

export RERUN_HOME=~/.rerun
export RERUN_BIN=~/.rerun/rerun
export RERUN_MODULES=~/.rerun/rerun-modules
export RERUN_MODULES_SOURCE=$BASH_UTILS_HOME/rerun-modules

export RERUN_COLOR=true

# copy bash_utils to global rerun location for use by all!!!
function export_dev_libs_to_global_libs() {
    #copy modules to home...
    echo "Rerun: making sure rerun modules are up to date"
    install_to_directory $RERUN_HOME $RERUN_MODULES_SOURCE
}

# install rerun, but only if it is not installed
function install_rerun_if_needed() {
    check_for_command rerun
    if (($? != 0)); then
       echo "Rerun: Rerun not found, installing...."

       git clone git://github.com/rerun/rerun.git $RERUN_HOME/rerun
       mv $RERUN_HOME/rerun/modules/stubbs $RERUN_MODULES/stubbs
    fi
}

function install_rerun() {
    add_to_path $RERUN_BIN

    # create needed rerun modules dir
    check_for_directory_exists $RERUN_HOME
    if [[ $DIR_EXISTS -eq 0 ]]; then
           echo "Rerun: Rerun global dirs not found, installing...."
           mkdir -p $RERUN_HOME
           mkdir -p $RERUN_MODULES
    fi

    install_rerun_if_needed

    check_env_is_dev
    if [[ $? = 1 ]]; then

       # use the modules in our dev directory not the ~ directory
       export RERUN_MODULES=$BASH_UTILS_HOME/rerun-modules
       echo "Rerun: setting up in dev mode modules: ${RERUN_MODULES}"
       check_for_directory_exists $RERUN_MODULES
       if [[ $DIR_EXISTS -eq 0 ]]; then
          echo "Rerun: creating rerun dev modules directory"
          mkdir -p $RERUN_MODULES
       fi
       # make sure we have a link to stubbs
       ln -sf $RERUN_BIN/modules/stubbs $RERUN_MODULES/stubbs

    else
       # make sure we have a link to stubbs
       ln -sf $RERUN_BIN/modules/stubbs $RERUN_MODULES/stubbs
       echo "Rerun: setting up in run mode modules: ${RERUN_MODULES}"
       export_dev_libs_to_global_libs  #make our newly devev libs info available to everyone!!!
    fi

    echo "================================================================"
    echo "Rerun: Rerun libraries configured, type 'rerun -help' for guide"
    echo "================================================================"
}

install_rerun

