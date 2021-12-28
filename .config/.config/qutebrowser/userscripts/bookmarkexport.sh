#!/usr/bin/env sh
set -eu

sed -E 's|^(\S+) ?(.*)|<a href="\1">\2</a>|' ~/.config/qutebrowser/bookmarks/urls > ~/.config/custom/qutebrowser-bookmarks.html



