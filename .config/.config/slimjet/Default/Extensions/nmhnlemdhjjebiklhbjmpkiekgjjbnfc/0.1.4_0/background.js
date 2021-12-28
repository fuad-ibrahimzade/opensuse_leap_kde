// ▼ options background 共通 ----
var defaultOpts = {
	enableFolders: [],
	ignoreFolders: [],
	isIgnoreBookmarkBar: true,
	isAutoRun: false,
	isAsc: true,
	compare: 'title',
	folderPlace: 'top', //top, mix, bottom
};
var bookmarkBarId = '1';
var opts = localStorage.opts===undefined ? {} : JSON.parse(localStorage.opts);
opts = Object.assign({}, defaultOpts, opts);
// ▲ ----

if(opts.isAutoRun) sort();

var isSorting = false;
var isSortingTimer = '';
var rootFolderId = '0';

function sort(){
	console.log(isSorting);
	if(isSorting || opts.enableFolders.length===0) return;
	isSorting = true;
	chrome.browserAction.setBadgeText({text: '...'});
	chrome.bookmarks.getTree(function(tree){
		loop(tree[0]);
	});
	function loop(dir){
		var box = [[], []];
		dir.children.forEach(function(item){
			var num = 0;
			if(item.children!==undefined && !(item.parentId===rootFolderId && opts.enableFolders.indexOf(item.id)===-1)) loop(item);
			if(item.children===undefined && opts.folderPlace==='top') num = 1;
			if(item.children!==undefined && opts.folderPlace==='bottom') num = 1;
			box[num].push(item);
		});
		var order = opts.isAsc ? -1 : 1;
		for(var i=0;i<box.length;i++){
			box[i].sort(function(a,b){
				var a_ = a[opts.compare]===undefined ? '' : a[opts.compare];
				var b_ = b[opts.compare]===undefined ? '' : b[opts.compare];
				if(opts.compare==='dateAdded'){
					if(a_<b_) return order;
					if(a_>b_) return order * -1;
					return 0;
				}else{
					return b_.localeCompare(a_, 'ja') * order;
				}
			});
		}
		var list = box[0].concat(box[1]);
		if(dir.id!==rootFolderId && !(dir.id===bookmarkBarId && opts.isIgnoreBookmarkBar) && opts.ignoreFolders.indexOf(dir.title)===-1) move(list, 0);
	}

	function move(list, index){
		clearTimeout(isSortingTimer);
		isSortingTimer = setTimeout(function(){
			isSorting = false;
			chrome.browserAction.setBadgeText({text: 'Done'});
			setTimeout(function(){
				chrome.browserAction.setBadgeText({text: opts.isAutoRun ? 'Auto' : ''});
			}, 1000);
		}, 200);
		if(list.length===0) return;
		chrome.bookmarks.move(list[index].id, {index: index}, function(){
			if(list.length>index+1) move(list, index+1);
		})
	}
}

//ボタンクリック
chrome.browserAction.onClicked.addListener(sort);

//イベント
chrome.bookmarks.onCreated.addListener(function(){if(opts.isAutoRun) sort()});
chrome.bookmarks.onRemoved.addListener(function(){if(opts.isAutoRun) sort()});
chrome.bookmarks.onChanged.addListener(function(){if(opts.isAutoRun) sort()});
chrome.bookmarks.onMoved.addListener(function(){if(opts.isAutoRun) sort()});
chrome.bookmarks.onChildrenReordered.addListener(function(){if(opts.isAutoRun) sort()});
chrome.bookmarks.onImportEnded.addListener(function(){if(opts.isAutoRun) sort()});


//受け取り処理
chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if(request.type==='save'){
			opts = request.opts;
			sort();
		}
	}
);




