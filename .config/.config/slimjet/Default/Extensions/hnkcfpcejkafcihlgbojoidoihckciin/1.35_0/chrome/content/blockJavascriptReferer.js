chrome.runtime.sendMessage({
	type:"blockReferrer"
}, function (r) {
	try {
		if(r.block){
			var meta = document.createElement('meta');
			meta.name = "referrer";
			meta.content = "no-referrer";
			document.getElementsByTagName('head')[0].appendChild(meta);
		}
	} catch(ignore){}
});
