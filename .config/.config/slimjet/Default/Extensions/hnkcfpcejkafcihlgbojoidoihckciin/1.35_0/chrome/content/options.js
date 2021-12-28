//"use strict";



// colortip
(function(c){function e(){}function f(b){this.content=b;this.shown=!1}c.fn.colorTip=function(b){b=c.extend({color:"black",timeout:10},b);return this.each(function(){var a=c(this);if(!a.attr("title"))return!0;new e;var d=new f(a.attr("title"));a.append(d.generate()).addClass("colorTipContainer");a.addClass(b.color);a.hover(function(){d.show()},function(){d.hide()});a.removeAttr("title")})};e.prototype={set:function(b,a){this.timer=setTimeout(b,a)},clear:function(){clearTimeout(this.timer)}};f.prototype= {generate:function(){return this.tip||(this.tip=c('<span class="colorTip">'+this.content+'<span class="pointyTipShadow"></span><span class="pointyTip"></span></span>'))},show:function(){this.shown||(this.tip.css("margin-left",-this.tip.outerWidth()/2).show(),this.shown=!0)},hide:function(){this.tip.hide();this.shown=!1}}})(jQuery);

var settings = {
	sites: [{"id":'defaultAction',"val":"dummy","type":"normal","filter":"","is3rd":"true"}],
	active: true,
	jsBlock: false
};

$('.button').bind('click',function(){
	var s = $(this);
	var id = s.attr("id");

	if(id == "buttonOn"){
		settings.active = true;
	} else if(id == "buttonOff"){
		settings.active = false;
	} else if(id == "jsbuttonOn"){
		settings.jsBlock = true;
	} else if(id == "jsbuttonOff"){
		settings.jsBlock = false;
	} else
		return;

	s.removeClass("buttonInactive");
	s.siblings().addClass("buttonInactive");
	save();
});

$('#deletelog').bind('click',function(){
	$('#log').empty();
});

$('#contextButton').bind('click',function(){

	if($(this).text() == ""){
		if(!localStorage['contextMenuActive'])
			localStorage['contextMenuActive'] = "Off";
		if(localStorage['contextMenuActive'] == "Off") {
			$(this).text("Off");
			$('#deletelog').hide();
			$('#log').hide();
			$('#log').empty();
		} else {
			$(this).text("On");
			$(this).addClass("logButtonActive");
		}
		return;
	}

	if($(this).hasClass("logButtonActive")){
		$(this).text("Off");
		$(this).removeClass("logButtonActive");
		localStorage['contextMenuActive'] = "Off";
	} else {
		$(this).text("On");
		$(this).addClass("logButtonActive");
		localStorage['contextMenuActive'] = "On";
	}
});

$('#import_input').bind('focusin',function(){
	this.value='';
});

$('#testSite').bind('focusin',function(){
	if(this.value == 'enter site to test against') this.value='http://';
}).bind('focusout',function(){
	if(this.value == ''||this.value=='http://') this.value='enter site to test against';
});

$('#logButton').bind('click',function(){
	if($(this).text() == ""){
		if(!localStorage['logActive'])
			localStorage['logActive'] = "Off";
		if(localStorage['logActive'] == "Off") {
			$(this).text("Off");
			$('#deletelog').hide();
			$('#log').hide();
			$('#log').empty();
		} else {
			$(this).text("On");
			$(this).addClass("logButtonActive");
		}
		return;
	}

	if($(this).hasClass("logButtonActive")){
		$(this).text("Off");
		$('#log').hide();
		$('#log').empty();
		$('#deletelog').hide();
		$(this).removeClass("logButtonActive");
		localStorage['logActive'] = "Off";
	} else {
		$('#log').show();
		$('#deletelog').show();
		$(this).text("On");
		$(this).addClass("logButtonActive");
		localStorage['logActive'] = "On";
	}
});

$('#contextButton').trigger('click');
$('#logButton').trigger('click');

$('#export').bind('click',function(){
	$('#import_input').hide();
	var input = $('#export_input');
	input.show();
	input.val(JSON.stringify(settings.sites));
	input.select();
});


$('#loadSync').bind('click',function(){
	chrome.storage.sync.get('RefererControlSettings', function(key) {

		if(chrome.runtime.lastError){
			$('#loadSync').html("Error!: " + chrome.runtime.lastError);
		} else {
			try {
				var keys = JSON.parse(key.RefererControlSettings);
				if(keys.sites){
					localStorage['settings'] = key.RefererControlSettings;
					$('#loadSync').html("loaded site filters from the cloud!");
				} else {
					$('#loadSync').html("no site filters found in the cloud.");
				}
			} catch(e){
				$('#loadSync').html("no site filters found in the cloud.");
			}
		}

		if (!localStorage['settings']){
			localStorage['settings'] = JSON.stringify(rc.settings);
			chrome.storage.local.set({'RefererControlSettings': localStorage['settings']}, function () {});
		}
	});
});

$('#import').bind('click',function(){
	$('#export_input').hide();
	var input = $('#import_input');
	if(input.is(":visible")){
		var newSettingRaw = input.val();
		try{
			var sites = JSON.parse(newSettingRaw);
			var count = 0;
			var failedCount = 0;
			for (var site in sites){
				var s = sites[site];
				if(s.id == "defaultAction") continue;

				if(s.id != undefined && s.val != undefined && s.type != undefined && s.filter != undefined && s.isregexp != undefined
					&& s.isfrom != undefined
					&& s.isto != undefined
					&& s.is3rd != undefined){
				} else {
					sites[site].val = "";
					failedCount++;
					//throw "sorry, corrupt or outdated data";
				}
			}
			// all data checked. now import it
			outer: for (site in sites){
				var oldSites = settings.sites;
				var s = sites[site];
				if(s.val == "" || s.id == "defaultAction") continue;
				inner: for (var oldsite in oldSites){
					var os = oldSites[oldsite];
					if(s.id == os.id){
						oldSites[oldsite] = s;
						count++;
						continue outer;
					}
				}
				oldSites.push(s);
				count++;
			}

			save();

			if(failedCount > 0 ){
				alert("successfully imported " + count + " site filters and " + failedCount + " site filters failed due to corrupt or outdated data");
			} else {
				alert("successfully imported " + count + " site filters.");

			}

		} catch(e){
			if(e.message)
				alert("An error occured while trying to import: "+ e.message);
			else
				alert("An error occured while trying to import: "+ e);

		}
	} else {
		input.show();
		input.val(' < paste your exported string here and click import again >');
	}
});

var defaultAction3rd = true;

if(!localStorage['settings']){
	localStorage['log'] = "";
	localStorage['settings'] = JSON.stringify(settings);
} else {
	settings = JSON.parse(localStorage['settings']);
	var defaultActionIndex = -1;
	for (var s in settings.sites) {
		if (settings.sites[s].val == "dummy") {
			if (settings.sites[s].id == "defaultAction")
				defaultActionIndex = s;
			break;
		}
	}
	if(!settings.sites[defaultActionIndex].hasOwnProperty('is3rd')){
		settings.sites[defaultActionIndex].is3rd = true;
		save();
	}

	defaultAction3rd = settings.sites[defaultActionIndex].is3rd;

	/*settings.sites.sort(function(a,b){
	 if(a.id == "defaulAction" || b.id == "defaulAction") return -1;
	 return Number(a.id) <= Number(b.id) ? -1 : 1;
	 });
	 settings.sites.sort();*/
}

//init button
if(settings.active)
	$('#buttonOff').addClass("buttonInactive");
else
	$('#buttonOn').addClass("buttonInactive");

if(settings.jsBlock)
	$('#jsbuttonOff').addClass("buttonInactive");
else
	$('#jsbuttonOn').addClass("buttonInactive");

var defaultValueSite = "enter site";
var defaultRefererValue = "set a specific referer to be sent";
var deleteTitle = "delete site filter";
var table = $('#settingsTable');
var entryPoint = $('#legend');

function addNewSiteRow(){
	//	console.log("newRow");
	var freeRowAvail = false;
	table.find('input').each(function(){
		var closest = $(this).closest('tr');
		if($(this).parent().hasClass('refererTD')){
			return;
		}
		if($(this).val() == defaultValueSite || $(this).val() == '' || $(this).val() == 'http://' ){

			if(freeRowAvail){
				closest.next().remove();
				closest.remove();
				settings.sites.splice(getSiteIndex($(this).closest('tr').attr('id')),1);
				return;
			}
			freeRowAvail = true;
			var specificRow = closest.next();
			specificRow.remove();
			closest.remove();
			entryPoint.after(closest);
			closest.after(specificRow);
			addClickEvents(closest);

		}
	});
	if(freeRowAvail) return;
	var id = new Date().getTime();
	var specificTD = '';


	//onfocus="if(this.value == \''+defaultRefererValue+'\') this.value=\'http://\';" onfocusout="if(this.value == \'\' || this.value == \'http://\') this.value=\''+defaultRefererValue+'\';"
	specificTD = '<tr class="hide" id="'+id+'_specific">'+
		'<td class="deleteDummy"></td>'+
		'<td colspan="8" class="specificRow">'+
		'<table class="specificTable">'+
		'<tr>'+
		'<td class="refererTD"><input type="text" rel="site" autocomplete="off" maxlength="1000" class="site" value="'+defaultRefererValue+'" role="textbox"></td>'+
		'<td name="URL" title="use the requested url as referer" class="specificButton">url</td>'+
		'<td name="TARGET_HOST" title="use the hostname of the target page as referer" class="specificButton">target&nbsp;host</td>'+
		'<td name="REFERER_HOST" title="use the hostname of the referer as referer" class="specificButton">referer&nbsp;host</td>'+
		'<td name="RANDOM" title="use a randomly generated domain as referer" class="specificButton">random</td>'+
		'<tr>'+
		'</table>'+
		'</td>'+
		'</tr>';

	//onfocus="if(this.value == \''+defaultValueSite+'\') this.value=\'http://\';" onfocusout="if(this.value == \'\' || this.value == \'http://\') this.value=\''+defaultValueSite+'\';" \
	var newRow= '<tr id="'+id+'">'+
		'<td name="delete"></td>'+
		'<td class="siteTD"><input type="text" rel="site" autocomplete="off" maxlength="1000" class="site" value="'+defaultValueSite+'" role="textbox"></td>'+
		'<td name="to" class="isFilterOption isFilterOptionActive" title="if you do not want to let this site know where you are coming from.">to</td>'+
		'<td name="from" class="isFilterOption isFilterOptionActive" title="to hide that you are originating from this site.">from</td>'+
		'<td name="3rd" class="isFilterOption isFilterOptionActive" title="filter third party referer only">3rd</td>'+
		'<td name="regexp" class="isFilterOption" title="interpret this filter as a regular expression">RegEx</td>'+
		'<td name="normal" filter="normal" class="normal inActive center">Normal</td>'+
		'<td name="specific" filter="specific" class="specific inActive center">Custom</td>'+
		'<td name="block" filter="block" class="block inActive center">Block</td>'+
		'</tr>';
	entryPoint.after(specificTD);
	entryPoint.after(newRow);

	addClickEvents($('#'+id));

	settings.sites.push({
		id: id,
		val: '',
		type: 'normal',
		filter: '',
		isregexp: false,
		is3rd: false,
		isfrom: true,
		isto: true
	});
	return $('#'+id);
}

function init(){

	var value = "";
	var filter = "";
	var site;
	for(s in settings.sites){
		site = settings.sites[s];

		if(site.id == "defaultAction") continue;

		// upgrade settings from version 0.21 to 0.22

		if(site.isfrom == undefined)
			site.isfrom = true;

		if(site.isto == undefined)
			site.isto = true;

		if(site.is3rd == undefined)
			site.is3rd = true;

		value = site.val == "" || site.val == defaultValueSite || site.val == "http://" || site.val == "https://" ?  defaultValueSite : site.val;

		filter = site.filter == "" || site.filter == defaultRefererValue ?  defaultRefererValue : site.filter;
		var def = value == defaultValueSite;
		var normal = "inActive";
		var block = normal;
		var specific = normal;
		var hidden = "class='hide'";
		var deleteClass = "";
		if(!def){
			switch(site.type) {
				case "normal":
					normal = "";
					break;
				case "block":
					block = "";
					break;
				case "specific":
					specific = "specificActive";
					hidden = "";
					break;
			}
			deleteClass = "delete";
		}
		var specificTD = '';
		var isFrom = "";
		var isTo = "";
		var is3rd = "";
		var isRegExp = "";
		var isRegExp2 = "?";
		var isValidRegExp = true;

		if(site.isfrom)
			isFrom = "isFilterOptionActive";

		if(site.isto)
			isTo = "isFilterOptionActive";

		if(site.is3rd)
			is3rd = "isFilterOptionActive";

		if(site.isregexp){
			isRegExp = "isFilterOptionActive";
			try {
				new RegExp(value);
			} catch(e){
				isValidRegExp = false;
			}
		}
//onfocus="if(this.value == \''+defaultRefererValue+'\') this.value=\'http://\';" onfocusout="if(this.value == \'\' || this.value == \'http://\') this.value=\''+defaultRefererValue+'\';"
		specificTD = '<tr '+hidden+' id="'+site.id+'_specific">'+
			'<td class="deleteDummy"></td>'+
			'<td colspan="8" class="specificRow">'+
			'<table class="specificTable">'+
			'<tr>'+
			'<td class="refererTD"><input type="text" rel="site" autocomplete="off" maxlength="1000" class="site" value="'+filter+'" role="textbox"></td>'+
			'<td name="URL" title="use the requested url as referer" class="specificButton">url</td>'+
			'<td name="TARGET_HOST" title="use the hostname of the target page as referer" class="specificButton">target&nbsp;host</td>'+
			'<td name="REFERER_HOST" title="use the hostname of the referer as referer" class="specificButton">referer&nbsp;host</td>'+
			'<td name="RANDOM" title="use a randomly generated domain as referer" class="specificButton">random</td>'+
			'<tr>'+
			'</table>'+
			'</td>'+
			'</tr>';
		// <tr style="height: 12px;"><td colspan="4"></td> </tr>

		//onfocus="if(this.value == \''+defaultValueSite+'\') this.value=\'http://\';" onfocusout="if(this.value == \'\' || this.value == \'http://\') this.value=\''+defaultValueSite+'\';"
		var siteTD = '<tr id="'+site.id+'">'+
			'<td name="delete" title="'+deleteTitle+'" class="'+deleteClass+'"></td>'+
			'<td class="siteTD"><input type="text" rel="site" autocomplete="off" maxlength="1000" class="site" value="'+value+'" role="textbox"></td>'+
			'<td name="to" class="isFilterOption '+isTo+'" title="if you do not want to let this site know where you are coming from">to</td>'+
			'<td name="from" class="isFilterOption '+isFrom+'" title="to hide that you are originating from this site">from</td>'+
			'<td name="3rd" class="isFilterOption '+is3rd+'" title="filter third party referer only">3rd</td>'+
			'<td name="regexp" class="isFilterOption '+isRegExp+'" title="interpret this filter as a regular expression">RegEx</td>'+
			'<td name="normal" filter="normal" class="normal '+normal+' center">Normal</td>'+
			'<td name="specific" filter="'+site.filter+'" class="specific '+specific+' center">Custom</td>'+
			'<td name="block" filter="block" class="block '+block+' center">Block</td>'+
			'</tr>'+specificTD;

		entryPoint.after(siteTD);
		addClickEvents($('#'+site.id));
		if(!isValidRegExp)
			$('#'+site.id).find(".site").css("border","1px solid red");
	}
	addNewSiteRow();
	// add defaultActionEvents
	var defaultIndex = getSiteIndex('defaultAction');
	$('#defaultAction_specific').find('input').val(settings.sites[defaultIndex].filter);
	addClickEvents($('#defaultAction'));


	// restore defaultAction
	if(!defaultAction3rd)
		$('#dA3rd').trigger('click');
	$('#defaultAction').children('.'+settings.sites[defaultIndex].type).trigger('click');

	$('#testSite').bind('focusout',function() {
		var s = $(this);
		var val = s.val();
		if(val == "" || val == "enter site to test against"){
			$('#testFilter').html("used filter");
			return;
		}
		var referer = "< normal >";
		var defaultIndex = 0;
		var hit = false;
		filter: for(var s in settings.sites){
			if(settings.sites[s].id == "defaultAction"){
				defaultIndex = s;
				continue;
			}
			if(settings.sites[s].val == "") continue;
			var siteFilter = settings.sites[s].isregexp ? settings.sites[s].val : parseWildCard(escapeRegexpChars(settings.sites[s].val));
			try {
				var regexp = new RegExp(siteFilter);
				if(regexp.test(val)){
					referer = settings.sites[s].val + '<span style="color: #999">  &lt; filter used &gt;</span>';
					hit = true;

					//highlight found filter:
					var id = settings.sites[s].id;
					var input = $('#'+id).find('input');
					input.css("outline","2px solid #9C9");
					window.setTimeout(function(){input.css("outline",'');},4000);


					/*switch(settings.sites[s].type){
					 case "normal":
					 break filter;
					 case "block":
					 referer = "< block >";
					 break;
					 case "specific":
					 referer = settings.sites[s].filter;
					 }*/
				}
			} catch(e){

			}
		}
		if(!hit){
			var defaultTable = $('#defaultTable');
			defaultTable.css("outline","2px solid #9C9");
			window.setTimeout(function(){defaultTable.css("outline",'');},3000);
			referer = '<span style="color: #444">&lt; default action &gt;</span>';
		}
		$('#testFilter').html(referer);
	}).bind("keypress", enterKeyPress);

	//context menu commands
	if(location.hash != ""){
		var url = document.createElement('a');
		url.href = location.hash.substring(2);
		var filterUrl = url.protocol+"//"+url.hostname;
		var filterType = Number(location.hash.substr(1,1));
		var emptyRow = $('#settingsTable').find('.siteTD').first().children().first();
		emptyRow.val(filterUrl).focusout();
		var typeName = 'specific';
		var customTypeName = 'RANDOM';
		switch(filterType){
			case 1:
				typeName = 'normal';
				break;
			case 2:
				typeName = 'block';
				break;
			case 5:
				customTypeName = 'URL';
				break;
			case 6:
				customTypeName = 'TARGET_HOST';
				break;
			case 7:
				customTypeName = 'REFERER_HOST';
				break;
			case 8:
				customTypeName = 'RANDOM';
				break;
		}
		emptyRow.parent().siblings('.'+typeName).trigger('click');
		//specific
		if(filterType > 4){
			var specificTr = emptyRow.closest('tr').next().find('.specificButton[name='+customTypeName+']').trigger('click');
		} else if(filterType == 1){
			emptyRow.parent().siblings('[name=3rd]').trigger('click');
		}
		var highlightRow = emptyRow;
		window.setTimeout(function(){
			highlightRow.css("outline","2px solid #9C9");
			window.setTimeout(function(){highlightRow.css("outline",'');},4000);
		},1000);
		location.hash = "";
	}

	$('[title]').colorTip('black');

	//catch changes from context menu or other option pages
	window.addEventListener('storage', function (e) {
		if(e.newValue == undefined) return;
		if(e.key === "log"){
			updateLog();
		} else if (e.key == "popupUrl"){
			var url = document.createElement('a');
			url.href = e.newValue;
			var filterUrl = url.protocol+"//"+url.hostname;
			var filterType = Number(location.hash.substr(1,1));
			var emptyRow = $('#settingsTable').find('.siteTD').first().children().first();
			emptyRow.val(filterUrl).focusout();
			emptyRow.parent().siblings('.block').trigger('click');
			var highlightRow = emptyRow;
			setTimeout(function(){
				highlightRow.css("outline","2px solid tomato");
				setTimeout(function(){highlightRow.css("outline",'');},8000);
			},1000);
			delete localStorage.popupUrl;
		} else {
			if(!/disqus/.test(e.url)){
				location.reload();
			}
		}
	},false);
}

function getActive(s){
	return s.siblings('.center').not('.inActive');
}


var buttonOrigin = true;

function addClickEvents(row){
	//	console.log("clickEvents");


	row.children('[name=delete]').bind('click',function() {
		var s = $(this);
		var name = s.attr("name");
		var row = s.closest('tr');
		var val = row.find(".site").val();
		if(val == "" || val == "http://" || val == defaultValueSite){
			return;
		}
		var id = row.attr('id');
		var index = getSiteIndex(id);

		row.next().remove();
		row.remove();
		settings.sites.splice(getSiteIndex(id),1);
		save();
	});

	row.children('.isFilterOption').bind('click',function() {
		var s = $(this);
		var row = s.closest('tr');
		var input = row.find(".site");
		var val = row.find(".site").val();
		var name = s.attr('name');
		if(val == "" || val == "http://" || val == defaultValueSite){
			var cssCache = input.css("border");
			input.css("border","1px solid red");
			window.setTimeout(function(){input.css("border",cssCache);},100);
			if(buttonOrigin)
				return;
		}
		buttonOrigin = true;
		var checked = false;
		if(s.hasClass('isFilterOptionActive')){
			s.removeClass('isFilterOptionActive');
			input.css("border","1px solid #CCC");
		} else {
			s.addClass('isFilterOptionActive');
			checked = true;
			if(name == 'regexp')
				try{
					new RegExp(val)


				} catch(e){
					input.css("border","1px solid red");
				}
		}
		var id = row.attr('id');
		var index = getSiteIndex(id);
		var obj = settings.sites[index];
		if(!obj) return;

		switch(name){
			case 'to':
				obj.isto = checked;
				break;
			case 'from':
				obj.isfrom = checked;
				break;
			case '3rd':
				obj.is3rd = checked;
				break;
			case 'regexp':
				obj.isregexp = checked;
				break;
		}
		settings.sites[index] = obj;
		save();
	});

	row.children('.center').bind('click',function() {
		var s = $(this);
		var name = s.attr("name");
		var row = s.closest('tr');
		var val = row.find(".site").val();
		if(val == "" || val == "http://" || val == defaultValueSite){
			var input = row.find(".site");
			var cssCache = input.css("border");
			input.css("border","1px solid red");
			window.setTimeout(function(){input.css("border",cssCache);},100);
			if(buttonOrigin)
				return;
		}
		buttonOrigin = true;
		var id = row.attr('id');
		var index = getSiteIndex(id);
		//	var active = getActive(s.parent());
		var obj = settings.sites[index];
		if(!obj) return;
		obj.type = s.attr("name");
		var filter = row.next().find('input').val();
		if( filter != defaultRefererValue && filter != "")
			obj.filter = filter;
		s.siblings('.center').addClass('inActive');
		s.removeClass('inActive');
		if(name == "specific"){
			s.addClass('specificActive');
			row.next().show('fast');
		} else {
			s.siblings('.specificActive').removeClass('specificActive');
			row.next().hide('fast');
		}
		settings.sites[index] = obj;
		save();
		$('#testSite').trigger('focusout');
		return;
	});

	row.next().find('.specificTable').find('td[name]').bind('click',function(){
		var s = $(this);
		var name = s.attr("name");
		var input = s.siblings('.refererTD').children();
		input.val('['+name+']');
		input.trigger('focusout');
	});
	var customInput = row.next().find('input');
	customInput.bind('focusout',function() {
		$(this).closest('.specificRow').parent().prev().find('.site').trigger('focusout');
	});

	customInput.bind("keypress", enterKeyPress);




	row.next().find('.site').bind('focusin',function(){
		var s = $(this);
		var val = s.val();
		if(val == 'set a specific referer to be sent') s.val('http://');
	}).bind('focusout',function(){
		var s = $(this);
		var val = s.val();
		if(val == '' || val == 'http://') s.val('set a specific referer to be sent');
	});

//onfocus="if(this.value == \''+defaultRefererValue+'\') this.value=\'http://\';" onfocusout="if(this.value == \'\' || this.value == \'http://\') this.value=\''+defaultRefererValue+'\';"
	row.find('.site').bind('focus',function() {
		var s = $(this);
		var val = s.val();
		if(val == defaultValueSite) s.val('http://');
		var active = getActive(s.parent());
		if(active.length == 0){
			buttonOrigin = false;
			s.parent().siblings('.normal').trigger('click');
		}
	}).bind('focusout',function() {
		var s = $(this);

		s.css("border","1px solid #CCC");
		var val = s.val();

		if(val == '' || val == 'http://') s.val(defaultValueSite);

		if(val == "" || val == "http://" || val == defaultValueSite){
			s.parent().siblings().removeClass('inActive');
			//	s.parent().siblings('[name=delete]').removeClass("delete");
			s.parent().siblings('.center').addClass('inActive');
			addNewSiteRow();
			save();
			return;
		}

		var closest = s.closest('tr');
		var id = closest.attr('id');

		var index = getSiteIndex(id);
		var active = getActive(s.parent());
		var obj = {};
		var referer = closest.next().find('input').val();
		if( referer == defaultRefererValue) referer = "";
		closest.children('[name=delete]').addClass("delete");

		if(index == -1){
			obj = {
				id: id,
				val: val,
				type: active.attr("name"),
				filter: referer,
				isregexp: closest.children('.isRegExp').hasClass('isRegExpActive')
			}
			settings.sites.push(obj);
		} else {
			obj = settings.sites[index];
		}

		if(obj.isregexp)
			try{
				new RegExp(val)
			} catch(e){
				s.css("border","1px solid red");
				alert(e.message);
				return;
			}

		obj.val = val;
		obj.type = active.attr("name");
		obj.filter = referer;

		//obj.isregexp = closest.children('.isRegExp').hasClass('isRegExpActive');
		settings.sites[index] = obj;
		save();
		window.setTimeout(addNewSiteRow, 500);
		$('#testSite').trigger('focusout');
	}).bind("keypress", enterKeyPress);
}

function enterKeyPress(e){
	if (e.which == 13) {
		$(this).blur();
		return false;
	}
}

function getSiteIndex(id) {
	for(var s in settings.sites){
		if(settings.sites[s].id == id)
			return s;
	}
	return -1;
}
var excapeRegexp = new RegExp("([{}\(\)\^$&.\*\?\/\+\|\[\\\\]|\]|\-)","g");

function escapeRegexpChars(s){
	return s.replace(this.excapeRegexp,"\\$1");
}

function parseWildCard(s){
	return s.replace('\\\*',".*?");
}
function save(){
	//	console.log("save");
	localStorage['settings'] = JSON.stringify(settings);
}

init();
/*var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-30880502-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = 'https://ssl.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();*/

function updateLog(){
	$('#log').prepend(localStorage['log']);
	localStorage['log'] = "";
}
updateLog();