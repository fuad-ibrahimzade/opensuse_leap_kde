if status is-interactive
    # Commands to run in interactive sessions can go here
end

set -g -x DOTNET_ROOT /home/qaqulya/dotnet
set -g -x NPM_CONFIG_PREFIX /home/qaqulya/.npm-global
set session (bass echo "base_\$(uuidgen)")
if type -q tmux
	if not set -q TMUX
   		set -g TMUX tmux new-session -d -s $session
   		eval $TMUX
   		tmux attach-session -d -t $session
   		##tmux attach -t $session || tmux new -s $session; exit
	end
end

#trap "kill $3mux_pid" KILL
#trap "kill $3mux_pid" INT
#trap "kill $3mux_pid" HUP
#trap "kill $3mux_pid" TERM
#trap "kill $3mux_pid" QUIT

#set session (bass echo "base_\$(uuidgen)")
#set current_fish_pid ""
#set 3mux_pid ""
#if type -q 3mux
	#if not set -q THREEMUX 
		#set current_fish_pid (echo $fish_pid)
		#3mux new $session
		#set 3mux_pid ""
		##set 3mux_pid $last_pid
		##3mux & set 3mux_pid eval echo \$!
		##bass 3mux_pid="\$(sh -c 'echo \$\$; exec 3mux new \$session')"
		##3mux $session
	#else
		##set 3mux_pid (echo %self)
		#set 3mux_pid (echo $fish_pid)
	#end
#end
#
#function handleSignal --on-signal TERM
##hup int quit kill term
	#if set -q THREEMUX 
    		#kill $3mux_pid
    		##kill %self
	#end
#
#end

#function on_exit --on-process-exit %self
    	#tmux kill-session
    	##kill %self
	#if set -q THREEMUX 
    		#kill $3mux_pid
    		##kill %self
	#end
#end
#function ontermination -s HUP -s INT -s QUIT -s TERM --on-process-exit %self
	#if set -q THREEMUX 
    		#kill $3mux_pid
    		##kill %self
	#end
#end
#function exit
    	#tmux kill-session
    	##kill %self
	#if set -q THREEMUX 
  		#kill $3mux_pid
  		##kill %self
	#end
#end
#function logout
    	#tmux kill-session
    	##kill %self
	#if set -q THREEMUX 
  		#kill $3mux_pid
  		##kill %self
	#end
#end
function removepath
    if set -l index (contains -i $argv[1] $PATH)
        set --erase --universal fish_user_paths[$index]
        echo "Updated PATH: $PATH"
    else
        echo "$argv[1] not found in PATH: $PATH"
    end
end
function save_qutebrowser_bookmarks
	bash -c "sed -E 's|^(\S+) ?(.*)|<a href=\"\1\">\2</a>|' ~/.config/qutebrowser/bookmarks/urls > qutebrowser-bookmarks.html"
end


set -g -x QT_QPA_PLATFORMTHEME "qt5ct"
set -g -x QT_PLATFORMTHEME "qt5ct"
set -g -x QT_PLATFORM_PLUGIN "qt5ct"
set -g -x QT_AUTO_SCREEN_SCALE_FACTOR 0
set -g -x QT_SCALE_FACTOR 1

#alias nvim /home/qaqulya/.local/bin/neovim
function nvim
    /home/qaqulya/.local/bin/neovim $argv
end
set -g -x EDITOR "neovim"
set -g -x VISUAL "neovim" 
