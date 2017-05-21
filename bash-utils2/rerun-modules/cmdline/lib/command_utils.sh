#!/bin/sh
# NOTE: these are used from the boostrap scripts and must not use rerun commands - you should only use functions available from init.sh
function check_for_command() {
   command -v $1 >/dev/null 2>&1 || { echo >&2 "I require $1 but it's not installed."; return 1; }
}

function add_to_path () {
    if [[ "$PATH" =~ (^|:)"${1}"(:|$) ]]
    then
        #echo "adding $1 to path"
        return 0
    fi
    echo "command_utils: adding $1 to path"
    export PATH=${1}:$PATH
}

#NOTE USING UNIX DEFAULT FOR RETURN CODES!
#NOTE DIFFERENT THAN DIR EXISTS CALL!
function check_for_file_exists {
   if [ -f $1 ];then
      #echo debug "File $FILE exists."
      FILE_EXISTS=0
   else
      #echo debug "File $FILE does not exist."
      FILE_EXISTS=1
   fi
   return $FILE_EXISTS
}

#source
function check_for_directory_exists {
    if [[ -d "$1" ]]; then
      DIR_EXISTS=1
    else
      DIR_EXISTS=0
    fi
    return $DIR_EXISTS
}

function check_env_is_dev {
  if [[  $BASH_UTILS_ENV == "dev" ]]; then
     echo "command_utils: Environment dev"
     return 1
  elif [[  $BASH_UTILS_ENV == "stg" ]]; then
     echo "command_utils: Environment stg"
     return 0
  fi
  echo "command_utils: Environment UNKNOWN!!!"
  return 0
}

function which_os {
    UNAME=`uname`
    if [[ $UNAME == "Darwin" ]]; then
       OS="MAC"
    elif [[ $UNAME == MINGW* ]]; then
       OS="WINDOWS"
    else
       OS="LINUX"
    fi
}
