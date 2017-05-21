# Shell functions for the env module.
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

#rerun stubbs:add-module --module env --description "loads environment config from config directory"
#rerun stubbs:add-command --command load --module env --description "loads environment config"
#rerun stubbs:add-command --command print --module env --description "print environment config"
#rerun stubbs:add-option --option config_dir --default "./config" --export true --required false --command load --module env --description "where config files are located"
#rerun stubbs:add-option --option config_dir --default "./config" --export true --required false --command print --module env --description "where config files are located"

#source $RERUN_MODULE_DIR/lib/environment-helper.sh

