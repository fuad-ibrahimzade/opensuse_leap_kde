// ▼ options background 共通 ----
let defaultOpts = {
	enableFolders: [],
	ignoreFolders: [],
	isIgnoreBookmarkBar: true,
	isAutoRun: false,
	isAsc: true,
	compare: 'title',
	folderPlace: 'top', //top, mix, bottom
};
let bookmarkBarId = '1';
let opts = localStorage.opts===undefined ? {} : JSON.parse(localStorage.opts);
opts = Object.assign({}, defaultOpts, opts);
// ▲ ----
let elEnableFoldersWrap = document.querySelector('.enable_folders_wrap');
let elEnableFolders;
let elInputOrder = document.querySelector('.input_order');
let elInputFolderPlace = document.querySelector('.input_folder_place');
let elInputAutoRun = document.querySelector('.input_auto_run');
let elInputIgnoreBookmarkBar = document.querySelector('.input_ignore_bookmark_bar');
let elInputIgnoreFolders = document.querySelector('.input_ignore_folders');
let bookmarkBarName = 'Bookmark bar';
let elBookmarkBarName = document.querySelector('.bookmark_bar_name');

(function(){
	let language = (window.navigator.languages && window.navigator.languages[0]) ||
		window.navigator.language ||
		window.navigator.userLanguage ||
		window.navigator.browserLanguage;
	
	let translate = {
		ja: {
			EnableFolder : '並べ替えを適用するフォルダを選択。',
			Order : '並び順',
			FolderPlace : 'フォルダの位置',
			Top : '上',
			Mix : '混ぜる',
			Bottom : '下',
			AutoRun : '自動実行',
			WithoutPressing : 'アイコンを押さなくても実行されます。',
			IgnoreFolder : '無視するフォルダ階層',
			FolderNameLineBreaks : '改行区切りでフォルダ名を指定することもできます。',
			Save : '保存',
			RestoreDefault : '初期値を入力',
		},
		en: {
			EnableFolder : 'Enable the folder to which the sort is applied.',
			Order : 'Order',
			FolderPlace : 'Folder Place',
			Top : 'Top',
			Mix : 'Mix',
			Bottom : 'Bottom',
			AutoRun : 'Auto Run',
			WithoutPressing : 'It is executed without pressing the button.',
			IgnoreFolder : 'Ignore in folder hierarchy',
			FolderNameLineBreaks : 'You can specify the folder name using line breaks.',
			Save : 'Save',
			RestoreDefault : 'Restore Default',
		}
	}
	let lang = translate[language==='ja' ? 'ja' : 'en'];
	document.querySelectorAll('[data-lang]').forEach(function(el){
		el.innerText = lang[el.innerText];
	});
})();

chrome.bookmarks.getChildren('0', function(folders){
	let html = '';
	folders.forEach(function(folder){
		if(folder.id===bookmarkBarId) bookmarkBarName = folder.title;
		html += '<label><input type="checkbox" class="enable_folders" value="'+folder.id+'"> '+folder.title+'</label><br>';
	});
	elEnableFoldersWrap.innerHTML = html;
	elEnableFolders = document.querySelectorAll('.enable_folders');
	elBookmarkBarName.innerHTML = bookmarkBarName;
	setVal(opts);
});

document.querySelector('.btn_save').addEventListener('click', function (e) {
	saveOpts();
});

document.querySelector('.btn_default').addEventListener('click', function (e) {
	setVal(defaultOpts);
});

function setVal(opts){
	elEnableFolders.forEach(function(el){
		el.checked = opts.enableFolders.indexOf(el.value)>-1;
	});
	elInputOrder.value = opts.compare+' '+(opts.isAsc ? 'asc' : 'desc');
	elInputFolderPlace.value = opts.folderPlace;
	elInputAutoRun.checked = opts.isAutoRun;
	elInputIgnoreBookmarkBar.checked = opts.isIgnoreBookmarkBar;
	elInputIgnoreFolders.value = opts.ignoreFolders.join('\n');
}

function saveOpts(){
	let enableFolders = [];
	elEnableFolders.forEach(function(el){
		if(el.checked) enableFolders.push(el.value);
	});
	opts.enableFolders = enableFolders;
	opts.ignoreFolders = elInputIgnoreFolders.value==='' ? [] : elInputIgnoreFolders.value.split('\n');
	opts.isIgnoreBookmarkBar = elInputIgnoreBookmarkBar.checked;
	opts.isAutoRun = elInputAutoRun.checked;
	opts.isAsc = elInputOrder.value.split(' ')[1]==='asc';
	opts.compare = elInputOrder.value.split(' ')[0];
	opts.folderPlace = elInputFolderPlace.value;
	//bgへ送信
	chrome.runtime.sendMessage({type: 'save', opts: opts});
	localStorage.opts = JSON.stringify(opts);
}
