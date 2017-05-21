#!/bin/sh
# NOTE: these are used from the boostrap scripts and must not use rerun commands - you should only use functions available from init.sh
function install_to_directory () {
   check_for_directory_exists $1
   if [[ $DIR_EXISTS -eq 0 ]]; then
      mkdir $1
   fi
   echo "install_util: updating files from $2 to $1"
   which_os
   if [[ $OS == "WINDOWS" ]]; then
      cp -r --remove-destination $2 $1
   else
      rsync --progress -r -u $2 $1
   fi

}