#!/usr/bin/env roundup
#
#/ usage:  rerun stubbs:test -m cmdline -p file_exists [--answers <>]
#

# Helpers
# -------
[[ -f ./functions.sh ]] && . ./functions.sh

# The Plan
# --------
describe "file_exists"

# ------------------------------
# Replace this test. 
it_fails_without_a_real_test() {
    exit 1
}
# ------------------------------

