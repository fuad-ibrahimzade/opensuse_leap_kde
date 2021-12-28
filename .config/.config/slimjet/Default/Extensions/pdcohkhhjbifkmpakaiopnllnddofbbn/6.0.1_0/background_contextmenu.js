// This file takes care of contextMenu (right click)
/////////////////////////////////////////////////////////////////////////////////////
// Creating context menu: An add to papaly button for right click menu.

// Check content_suggestion for more details
var added_to_papaly = "\
  var papaly_notices = document.getElementsByClassName('papaly-notice');\
  while(papaly_notices[0]) {\
    papaly_notices[0].parentNode.removeChild(papaly_notices[0]);\
  }\
  var e = document.createElement(\"div\");\
  e.id = \"papaly-\" + new Date().getTime();\
  e.className = \"papaly-notice\";\
  e.innerHTML = '<div class=\"papaly-click-notice\">' +\
                  '<div class=\"papaly-notice-text\">Link added to <img width=\"61px;\" style=\"position: relative; vertical-align: text-top; margin-left: 3px; margin-right: 3px;\" src=\"https://papaly.com/assets/logo-41602eefb2908e739d4cf121250fd7c0.png\" alt=\"Papaly\"/></div>' +\
                  '<div class=\"buttons-container\">' +\
                    '<div class=\"papaly-notice-close-button papaly-notice-clickable\">Close</div>' +\
                    '<div class=\"view-button\"><a href=\"" + HOST_HTTPS + "\" target=\"_blank\">View</a></div>' +\
                  '</div>' + \
                  '<div class=\"papaly-notice-clear-float\"></div>' +\
                '</div>';\
  var style = document.createElement(\"style\");\
  style.innerHTML = '.papaly-click-notice {' +\
                        'background-color: #fff; background-color: rgba(255,255,255,.93);' +\
                        'border: 1px solid #D4D5D6;' +\
                        'border-top: 3px solid #3AC0F6;' +\
                        'box-shadow: -2px 2px 3px rgba(0,0,0,.17);' +\
                        'position: absolute; top: 10px; right: 10px;' +\
                        'font-family: tahoma, arial, sans-serif; z-index: 1100000000; line-height: 16px;}' +\
                    '.papaly-click-notice .papaly-notice-text {' +\
                      'font-size: 13px;' +\
                      'float: left;' +\
                      'padding: 22px;' +\
                      'border-right: 1px solid #D4D5D6;}' +\
                    '.papaly-click-notice .buttons-container {' +\
                      'float: right;}' +\
                    '.buttons-container {' +\
                      'width: 55px;}' +\
                    '.buttons-container .view-button a {' +\
                      'display: block;' +\
                      'height: 30px;' +\
                      'line-height: 30px;' +\
                      'text-align: center;}' +\
                    '.buttons-container .view-button a:hover {' +\
                      'background-color: #f5f5f5;}' +\
                    '.papaly-click-notice .papaly-notice-close-button {' +\
                      'height: 30px;' +\
                      'text-align: center;' +\
                      'line-height: 30px;' +\
                      'border-bottom: 1px solid #D4D5D6;}' +\
                    '.papaly-click-notice .papaly-notice-close-button-img { position: absolute; top: 0px; right: 0px; left: 0; bottom: 0; margin: auto; width: 8px;}' +\
                    '.papaly-click-notice .papaly-notice-clickable {' +\
                      'cursor: pointer;}' +\
                    '.papaly-click-notice .papaly-notice-clickable:hover {' +\
                        'background-color: #f5f5f5;}' +\
                    '.papaly-click-notice .papaly-notice-clear-float {' +\
                      'clear: both;}';\
  e.appendChild(style);\
  document.body.appendChild(e);\
  e.querySelector('.papaly-notice-close-button').onclick = function(){\
    var papaly_notices = document.getElementsByClassName('papaly-notice');\
    while(papaly_notices[0]) {\
      papaly_notices[0].parentNode.removeChild(papaly_notices[0]);\
    }\
  };\
  setTimeout(function(){\
    e.parentNode && e.parentNode.removeChild(e);\
  }, 5000);\
";

// First remove all, this will only remove menu item from us. Although I don't think it's working well enough as adding one more item would bring back everything.
chrome.contextMenus.removeAll();
// Right click to add to papaly
chrome.contextMenus.create({
  title: 'Add page to Papaly',
  contexts: ['page'],
  onclick: function(onClickData, tab) {
    // // Menu clicked
    // console.log('papaly content menu clicked');
    // console.log(onClickData);
    // console.log(tab);

    // Send out the request, and also saves the item
    var item = create_item(tab, {'from' : 'add_page_to_papaly'}, function(item) {
      // Show message
      chrome.tabs.executeScript({
        code: added_to_papaly
      });
      chrome.browserAction.setIcon({
        path: {19: 'assets/added-19.png', 38: 'assets/added-38.png'},
        tabId: tab.id
      });
      ga('send', 'event', 'xtn-chrome', 'click', 'CONTEXT_MENU_ADD_PAGE');
    });
  }
});


/** Right click to add to papaly
 * Due to chrome's policy, we don't have return value from run content script. The only way to communicate is to simply run the script on the page and send a message back.
 */
chrome.contextMenus.create({
  title: 'Add link to Papaly',
  contexts: ['link'],
  onclick: function(onClickData, tab) {
    // // Menu clicked
    // console.log('papaly content menu clicked');
    // console.log(onClickData);
    // console.log(tab);

    // Send request to the page to figure out the title
    var linkUrl = onClickData.linkUrl;
    var script = '\
      var x = document.getElementsByTagName("a"); \
      var linkName = ""; \
      for(var i=0; i < x.length; i++) { \
        var ahref_candidate = x[i]; \
        if (x[i].href.match("' + linkUrl + '") && \
            ahref_candidate.text.trim()) {\
          linkName = ahref_candidate.text.trim(); \
          break; \
        }; \
      }\
      var url = "' + HOST_HTTPS + '/items/create_from_url" + \
        "?source=xtn-chrome&url=" + encodeURIComponent("' + linkUrl + '") + \
        "&name=" + encodeURIComponent(linkName) + \
        "&from=add_link_to_papaly"; \
      var xhReq = new XMLHttpRequest(); \
      xhReq.open("PUT", url, true); \
      xhReq.onreadystatechange = function() {\
        if (xhReq.readyState == 4) {\
          var item = xhReq.responseText; \
          item = item.trim();\
          chrome.runtime.sendMessage({messageId: "itemAdded", item: item, timestamp: xhReq.getResponseHeader("date"), from: "right_click"});\
        }\
      };\
      try { \
        xhReq.send(null); \
      } catch (e) { \
      } \
    ' + added_to_papaly;
    // Show message
    chrome.tabs.executeScript({
      code: script
    });
    ga('send', 'event', 'xtn-chrome', 'click', 'CONTEXT_MENU_ADD_LINK');
  }
});

// Tool function used by pack tabs, add_item xtn button, and right click to add
function create_item(tab, params, callback) {
  return $.ajax({
    type: 'PUT',
    url: HOST_HTTPS + '/items/create_from_url',
    data: {
      'source': 'xtn-chrome',
      'url' : tab.url,
      'from': params.from,
      'category_index' : params.category_index,
      'name' : tab.title,
      'favIconUrl' : (tab.favIconUrl && tab.favIconUrl.match('http')) ?
                      tab.favIconUrl : ''
    },
    success: function(data, textStatus, jqXHR) {
      ga('send', 'event', 'item', 'create', 'success');
      var item = add_item_to_docs(data, params.category_index, jqXHR.getResponseHeader('date'));
      callback(item);
    },
    error: function() {
      ga('send', 'event', 'item', 'create', 'error');
    }
  });
}

// This function is called only in newtab. However, since it's closely related
// to item/category creation, it's put here for convenience.
// This function goes through all active tabs within the current window. Then
// create a Papaly category, with all tabs. Then if user wants, they can reopen
// all of those.
function pack_all_tabs(event) {
  // First get where to save on Papaly.
  var board = $(this).closest('#main').find('.board:visible');
  var board_id = board.attr('board-id');
  chrome.tabs.query({currentWindow: true, active: false}, function(tabs) {
    // Going in backward order because the create_from_url create at position 0
    tabs = tabs.reverse();
    // First create a card
    $.ajax({
      type: 'POST',
      url: HOST_HTTPS + '/categories',
      data: {
        'source': 'xtn-chrome',
        'board_id': board_id,
        'category[slot]': '0',
        'category[position]': '0',
        'category[name]' : 'Tabs ' + new Date().toLocaleDateString()
      },
      success: function(data, textStatus, jqXHR) {
        var card = add_card_to_docs(data, board_id, jqXHR.getResponseHeader('date'));
        var category_index = card.find('.card').attr('category-index');

        // This creates an asynchronous chain of ajax calls to guarantee
        // that the tab order is respected.
        let promise = Promise.resolve();
        for (let i = 0; i < tabs.length; i++) {
          let tab = tabs[i];
          let process_tab = () => {
            // create_item will take care of the creation and insertion.
            return create_item(tab, {
              'from' : 'pack_all_tabs',
              'category_index' : category_index
            }, (item) => {
              // Presumably pinned tabs are more important, so we skip closing them
              if (!tab.pinned) {
                chrome.tabs.remove(tab.id);
              }
            });
          }
          // The ES6 promise does not support finally syntax
          promise = promise.then(process_tab, process_tab);
        }
      }
    });
  });
}

////////////////////////////////////////////////////////////////////////////////
/*
The following code triggers an "Add this to Papaly" popup suggestion notice.

The logic below controls whether the popup is shown each time a page is visited.
The papaly_suggestion_interval is the minimum time between showing the popup.
It starts out at 60 hours but increases or decreases with user interaction.
If the interval has passed, it will show on the first site with enough visits.

The popup is shown by running content_suggestion.js on the page.

The popup updates the background page variables via background_message.js.
*/

// Global variables in the background page kept in sync with permanent storage.
var papaly_suggestion = new Date().getTime();
var papaly_suggestion_interval = 1000 * 3600 * 60;
chrome.storage.local.get(['papaly_suggestion', 'papaly_suggestion_interval'], function(items) {
  if (items['papaly_suggestion']) {
    papaly_suggestion = items['papaly_suggestion'];
  } else {
    papaly_suggestion = new Date().getTime();
    chrome.storage.local.set({'papaly_suggestion': papaly_suggestion});
  }
  if (items['papaly_suggestion_interval']) {
    papaly_suggestion_interval = items['papaly_suggestion_interval'];
  } else {
    papaly_suggestion_interval = 1000 * 3600 * 60;
    chrome.storage.local.set({'papaly_suggestion_interval': papaly_suggestion_interval});
  }
});
chrome.history.onVisited.addListener(function(h) {
  // Check if we have already showed this once in 60h=2.5days, if so, return
  if (papaly_suggestion + papaly_suggestion_interval > new Date().getTime()) {
    return; // We don't want to show suggestion too often
  }
  // It has to be a "hot" url that user (a) has visited a lot AND (b) has revisited within 48h
  if (h.visitCount < 5 || ((new Date()).getTime() - h.lastVisitTime > 3600000 * 48)) {
    return; // Not frequent enough
  }
  // Check if the user already has the item in Papaly
  if (get_item_by_url(h.url)) {
    return; // Do not show suggestion if already added to Papaly
  }
  // Seem like a page that user visits a lot, make a suggestion of
  // "Add to Papaly"
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    if (tab != undefined) {
      chrome.tabs.executeScript(tab.id, {
        file: 'content_suggestion.js'
      });
      papaly_suggestion = new Date().getTime();
      chrome.storage.local.set({
        'papaly_suggestion': papaly_suggestion,
        'papaly_suggestion_interval': papaly_suggestion_interval
      });
    }
  });
});
