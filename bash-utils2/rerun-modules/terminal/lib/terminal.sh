#!/bin/sh

function scrub_terminal {
  rerun_log debug "cleaning terminal env variables..."
  unset ANSWER
  :
}

function banner_line {
   for i in $(seq 1 $1);
    do
       echo -n $2
    done
    echo ""
}

function command_banner_start {
   echo ""
   banner_line 30 ">"
}

function command_banner_end {
   banner_line 30 "<"
   echo ""
}

function command_title_line {
   banner_line 30 "="
}

function banner_start {
   banner_line 80 "="
   echo -e $1
   banner_line 20 "-"
}

function banner_end {
   banner_line 80 "="
}

function banner {
   banner_start $1
   echo -e $2
   banner_end
}

function highlight_message {
   banner_line 80 "_"
   echo -e $1
   banner_line 80 "_"
}

#######################################################################
# ask the user a yes/no question
#
# pre-set variables:
#  NONE
#
# arguments:
#   arg 1 -  the message to display
#
# return:
#    answer - will have the input from the user
#    1 - if yes
#    2 - if no
########################################################################
function prompt_for_yes_no {
    while true; do
        read -p "$1 " answer
        case $answer in
            [yY]* ) return 1;
                    break;;
            [nN]* ) return 0;
                    break;;
            [Qq]* ) exit;;
            * ) echo "Please answer y or n or q";;
        esac
    done
}

function prompt_for_yes {
    while true; do
        read -p "$1 " answer
        case $answer in
            [yY]* ) return 1;
                    break;;
            [Qq]* ) exit;;
            * ) echo "Please answer y or n or q";;
        esac
    done
}

#######################################################################
# ask the user a question, q will exit script
#
# pre-set variables:
#  DEFAULT - a default value to be used
#
# arguments:
#   arg 1 -  the message to display (should include options for answers)
#
# return:
#    ANSWER - will have the input from the user
########################################################################
function prompt_for_answer {
    ANSWER=
    read -p "$1 [$DEFAULT] (q to quit)" ANSWER
    if [[ $ANSWER = "q" ]]; then
       exit;
    elif [[ $ANSWER = "" ]]; then
       ANSWER=$DEFAULT
    fi
}

upvar() {
    if unset -v "$1"; then           # Unset & validate varname
        if (( $# == 2 )); then
            eval $1=\"\$2\"          # Return single value
        else
            eval $1=\(\"\${@:2}\"\)  # Return array
         fi
    fi
}


function prompt_for_variable {

    if [[ -z "${!1}" ]]; then
       read -p "$2 [$3] (q to quit)" ANSWER
       if [[ $ANSWER = "q" ]]; then
          exit;
       elif [[ $ANSWER = "" ]]; then
          ANSWER=$3
       fi
       local "$1" && upvar $1 $ANSWER
    fi
}

scrub_terminal
