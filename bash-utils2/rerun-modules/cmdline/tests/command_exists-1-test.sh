#!/usr/bin/env roundup
#
#/ usage:  rerun stubbs:test -m cmdline -p command_exists [--answers <>]
#

# Helpers
# -------
[[ -f ./functions.sh ]] && . ./functions.sh

# The Plan
# --------
describe "command_exists"

# ------------------------------
# Replace this test. 
it_fails_without_a_real_test() {
    exit 1
}
# ------------------------------

