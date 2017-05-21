#!/bin/sh

function bash_utils_init() {
   #read in base libraries
   echo "init.sh: Reading in bootstrap_core.sh"
   source ${BASH_UTILS_HOME}/lib/bootstrap_core.sh
}

bash_utils_init
