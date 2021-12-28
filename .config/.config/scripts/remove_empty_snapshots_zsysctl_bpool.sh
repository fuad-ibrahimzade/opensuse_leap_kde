#!/usr/bin/env bash

set -euxo pipefail

# use at your own risk

zfs list -r -t snapshot -o name,used,referenced,creation bpool/BOOT | python3 -c "import sys;print('\n'.join([y[0].split('autozsys_')[1] for y in [x.split() for x in sys.stdin.readlines()] if y[0] != 'NAME']))" | xargs -i"{}" -n1 sudo zsysctl state remove {} --system

sudo zsysctl service gc --all -vv
