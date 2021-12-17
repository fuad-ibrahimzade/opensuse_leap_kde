#!/bin/bash

#(youtube-dl --output "$QUTE_DOWNLOAD_DIR/%(title)s.%(ext)s" $QUTE_URL && 
#(yt-dlp --output "$QUTE_DOWNLOAD_DIR/%(title)s.%(ext)s" $QUTE_URL --downloader aria2c --downloader-args "-x 2 -k 1M --continue --input-file /home/qaqulya/.local/share/diana.session --save-session /home/qaqulya/.local/share/diana.session" && notify-send "YouTube download completed!" "$QUTE_TITLE") || exit 0
#(yt-dlp --output "$QUTE_DOWNLOAD_DIR/%(title)s.%(ext)s" $QUTE_URL --downloader aria2p --downloader-args "add" && notify-send "YouTube download completed!" "$QUTE_TITLE") || exit 0
#(youtube-dl --output "$QUTE_DOWNLOAD_DIR/%(title)s.%(ext)s" $QUTE_URL --external-downloader aria2c --external-downloader-args "-x 2 -k 1M --continue --input-file /home/qaqulya/.local/share/diana.session --save-session /home/qaqulya/.local/share/diana.session" && notify-send "YouTube download completed!" "$QUTE_TITLE") || exit 0
#(youtube-dl --output "$QUTE_DOWNLOAD_DIR/%(title)s.%(ext)s" $QUTE_URL --external-downloader aria2p --external-downloader-args "add" && notify-send "YouTube download completed!" "$QUTE_TITLE") || exit 0

filename=$(youtube-dl --get-filename -o "%(title)s.%(ext)s" $QUTE_URL)
downloadurl=$(yt-dlp -f "18" -g $QUTE_URL)
(~/.config/scripts/diana/diana --out="$filename" add $downloadurl && notify-send "YouTube download added!" "$QUTE_TITLE") || exit 0

