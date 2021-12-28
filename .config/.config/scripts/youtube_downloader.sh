#!/bin/bash

#(youtube-dl --output "$QUTE_DOWNLOAD_DIR/%(title)s.%(ext)s" $QUTE_URL && 
#(yt-dlp --output "~/Downloads/%(title)s.%(ext)s" $QUTE_URL && 
#    notify-send "YouTube download completed!" "$QUTE_TITLE") || exit 0
yt-dlp -f 'bestvideo[height<480]+bestaudio/best[height<480]'
