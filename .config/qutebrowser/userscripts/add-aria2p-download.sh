#!/bin/bash

#filename=$(youtube-dl --get-filename -o "%(title)s.%(ext)s" $QUTE_URL)
#downloadurl=$(yt-dlp -f "18" -g $QUTE_URL)
#(~/.config/scripts/diana/diana --out="$filename" add $downloadurl && notify-send "YouTube download added!" "$QUTE_TITLE") || exit 0

(aria2p add $QUTE_URL && notify-send "Aria2p download added!" "$QUTE_TITLE") || exit 0
