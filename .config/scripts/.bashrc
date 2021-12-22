# Sample .bashrc for SuSE Linux
# Copyright (c) SuSE GmbH Nuernberg

# There are 3 different types of shells in bash: the login shell, normal shell
# and interactive shell. Login shells read ~/.profile and interactive shells
# read ~/.bashrc; in our setup, /etc/profile sources ~/.bashrc - thus all
# settings made here will also take effect in a login shell.
#
# NOTE: It is recommended to make language settings in ~/.profile rather than
# here, since multilingual X sessions would not work properly if LANG is over-
# ridden in every subshell.

# Some applications read the EDITOR variable to determine your favourite text
# editor. So uncomment the line below and enter the editor of your choice :-)
#export EDITOR=/usr/bin/vim
#export EDITOR=/usr/bin/mcedit

# For some news readers it makes sense to specify the NEWSSERVER variable here
#export NEWSSERVER=your.news.server

# If you want to use a Palm device with Linux, uncomment the two lines below.
# For some (older) Palm Pilots, you might need to set a lower baud rate
# e.g. 57600 or 38400; lowest is 9600 (very slow!)
#
#export PILOTPORT=/dev/pilot
#export PILOTRATE=115200

test -s ~/.alias && . ~/.alias || true
#export PATH="$PATH:/home/qaqulya/.local/bin"

# Source global definitions
if [ -f /etc/bashrc ]; then
        . /etc/bashrc
fi

# User specific environment
if ! [[ "$PATH" =~ "$HOME/.local/bin:$HOME/bin:" ]]
then
    PATH="$HOME/.local/bin:$HOME/bin:$PATH"
fi
export PATH

# Uncomment the following line if you don't like systemctl's au    to-paging feature:
# export SYSTEMD_PAGER=

# User specific aliases and functions
if [ -d ~/.bashrc.d ]; then
        for rc in ~/.bashrc.d/*; do
                if [ -f "$rc" ]; then
                        . "$rc"
                fi
        done
fi

unset rc
# Added by zap installation script
PATH=$PATH:$HOME/.local/bin

if [ "$TERM" = "linux" ]; then
        printf %b '\e[40m' '\e[8]' # set default background to     color 0 'dracula-bg'
        printf %b '\e[37m' '\e[8]' # set default foreground to     color 7 'dracula-fg'
        printf %b '\e]P0282a36'    # redefine 'black'              as 'dracula-bg'
        printf %b '\e]P86272a4'    # redefine 'bright-black'       as 'dracula-comment'
        printf %b '\e]P1ff5555'    # redefine 'red'                as 'dracula-red'
        printf %b '\e]P9ff7777'    # redefine 'bright-red'         as '#ff7777'
        printf %b '\e]P250fa7b'    # redefine 'green'              as 'dracula-green'
        printf %b '\e]PA70fa9b'    # redefine 'bright-green'       as '#70fa9b'
        printf %b '\e]P3f1fa8c'    # redefine 'brown'              as 'dracula-yellow'
        printf %b '\e]PBffb86c'    # redefine 'bright-brown'       as 'dracula-orange'
        printf %b '\e]P4bd93f9'    # redefine 'blue'               as 'dracula-purple'
        printf %b '\e]PCcfa9ff'    # redefine 'bright-blue' as '#cfa9ff'
        printf %b '\e]P5ff79c6'    # redefine 'magenta' as 'dracula-pink'
        printf %b '\e]PDff88e8'    # redefine 'bright-magenta' as '#ff88e8'
        printf %b '\e]P68be9fd'    # redefine 'cyan' as 'dracula-cyan'
        printf %b '\e]PE97e2ff'    # redefine 'bright-cyan' as '#97e2ff'
        printf %b '\e]P7f8f8f2'    # redefine 'white' as 'dracula-fg'
        printf %b '\e]PFffffff'    # redefine 'bright-white' as '#ffffff'
        clear
fi

