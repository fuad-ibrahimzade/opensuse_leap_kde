#!/bin/bash

poolname="$1"

#fsWithSnapshots=$(zfs list -Hr -t snapshot tank/share |grep '@' |cut -d '@' -f 1 |uniq)
fsWithSnapshots=$(zfs list -Hr -t snapshot "$poolname" |grep '@' |cut -d '@' -f 1 |uniq)

for fs in $fsWithSnapshots ; do
  # Changed to now sort newest to oldest.  This will mean that newer snapshots without deltas will get removed.
  emptySnapshot=$(zfs list -Hr -d1 -t snapshot -o name,used -S creation $fs |sed '$d' |awk ' $2 == "0B" { print $1 }' )
  for snapshot in $emptySnapshot ; do

    # Added safety check.  Verify the size of the snapshot prior to destroying it
    used=$(zfs list -Hr -d1 -t snapshot -o used $snapshot)
    if [[ $used != "0B" ]]; then
      continue
    fi

    echo "Destroying empty snapshot $snapshot"
    zfs destroy $snapshot
  done
done
