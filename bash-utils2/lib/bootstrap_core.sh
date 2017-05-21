#!/bin/sh
echo "bootstrap_core: loading colored commands"
source ${BASH_UTILS_HOME}/rerun-modules/message/lib/bash_colors.sh
echo "bootstrap_core: sourcing command_utils"
source ${BASH_UTILS_HOME}/rerun-modules/cmdline/lib/command_utils.sh
echo "bootstrap_core: sourcing install utils"
source ${BASH_UTILS_HOME}/rerun-modules/install/lib/install_util.sh

echo "bootstrap_core: sourcing core third party lib utils"
echo "bootstrap_core: sourcing rerun"
source ${BASH_UTILS_HOME}/lib/install_rerun.sh