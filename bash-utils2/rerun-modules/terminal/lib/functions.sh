# Shell functions for the terminal module.
#/ usage: source RERUN_MODULE_DIR/lib/functions.sh command
#

# Read rerun's public functions
. $RERUN || {
    echo >&2 "ERROR: Failed sourcing rerun function library: \"$RERUN\""
    return 1
}

# Check usage. Argument should be command name.
[[ $# = 1 ]] || rerun_option_usage

# Source the option parser script.
#
if [[ -r $RERUN_MODULE_DIR/commands/$1/options.sh ]]
then
    . $RERUN_MODULE_DIR/commands/$1/options.sh || {
        rerun_die "Failed loading options parser."
    }
fi

# - - -
# Your functions declared here.
# - - -
#rerun stubbs:add-module --name terminal

#rerun stubbs:add-command --command cmd-banner-start --module terminal --description 'create a command output start for easy reading'
#rerun stubbs:add-command --command cmd-banner-end --module terminal --description 'create a command output end for easy reading'
#rerun stubbs:add-command --command cmd-title-line --module terminal --description 'create a command output line for easy reading'

source $RERUN_MODULE_DIR/lib/terminal.sh



