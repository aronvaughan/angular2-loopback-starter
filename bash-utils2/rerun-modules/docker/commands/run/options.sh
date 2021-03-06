# Generated by stubbs:add-option. Do not edit, if using stubbs.
# Created: Fri Mar 31 23:57:55 CDT 2017
#
#/ usage: docker:run [ --name <>] [ --ports <>] [ --volumes <>]  --image <> [ --options <>] [ --cmd <>] [ --link <>] 

# _rerun_options_parse_ - Parse the command arguments and set option variables.
#
#     rerun_options_parse "$@"
#
# Arguments:
#
# * the command options and their arguments
#
# Notes:
#
# * Sets shell variables for any parsed options.
# * The "-?" help argument prints command usage and will exit 2.
# * Return 0 for successful option parse.
#
rerun_options_parse() {

    while (( "$#" > 0 ))
    do
        OPT="$1"
        case "$OPT" in
            --name) rerun_option_check $# $1; NAME=$2 ; shift ;;
            --ports) rerun_option_check $# $1; PORTS=$2 ; shift ;;
            --volumes) rerun_option_check $# $1; VOLUMES=$2 ; shift ;;
            --image) rerun_option_check $# $1; IMAGE=$2 ; shift ;;
            --options) rerun_option_check $# $1; OPTIONS=$2 ; shift ;;
            --cmd) rerun_option_check $# $1; CMD=$2 ; shift ;;
            --link) rerun_option_check $# $1; LINK=$2 ; shift ;;
            # help option
            -|--*?) echo >&2 "unrecognized option: $OPT"
                rerun_option_usage
                exit 2
                ;;
            # end of options, just arguments left
            *)
              break
        esac
        shift
    done

    # Set defaultable options.

    # Check required options are set
    [[ -z "$IMAGE" ]] && { echo >&2 "missing required option: --image" ; return 2 ; }
    # If option variables are declared exportable, export them.

    # Make remaining command line options available in 
    export _CMD_LINE="$@"
    #
    return 0
}


# If not already set, initialize the options variables to null.
: ${NAME:=}
: ${PORTS:=}
: ${VOLUMES:=}
: ${IMAGE:=}
: ${OPTIONS:=}
: ${CMD:=}
: ${LINK:=}
# Default command line to null if not set
: ${_CMD_LINE:=}


