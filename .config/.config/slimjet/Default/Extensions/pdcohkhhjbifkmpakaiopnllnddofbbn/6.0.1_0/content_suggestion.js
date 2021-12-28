// This content script adds a popup to the page to allow the user to add the current page to Papaly.
// The content script does not load all the time. Background_contextmenu.js's history listener checks whether
// a page is a good candidate and if enough time has passed to make the suggestion.

// First remove possible existing papaly
remove_papaly_notices();

// Create the suggestion notice div.
var s = document.createElement('div');
s.id = 'papaly-' + new Date().getTime();
s.className = 'papaly-notice';
s.innerHTML = '<div class="papaly-click-notice">' +
                '<div class="papaly-notice-text papaly-notice-clickable">Click to add this page to <img width="61px;" style="position: relative; vertical-align: text-top; margin-left: 6px;" src="https://papaly.com/assets/logo-41602eefb2908e739d4cf121250fd7c0.png" alt="Papaly"/></div>' +
                '<div class="papaly-notice-close-button papaly-notice-clickable"><img class="papaly-notice-close-button-img" src="https://papaly.com/assets/ui_icons/edit-delete-070a461050632049d822adffff17a993.png" alt="close"></div>' +
                '<div class="papaly-notice-clear-float">' +
                '</div>' +
              '</div>';
// Style it by adding an inline style.
var style = document.createElement('style');
style.innerHTML = '.papaly-click-notice {' +
                      'background-color: #fff; background-color: rgba(255,255,255,.93);' +
                      'border: 1px solid #D4D5D6;' +
                      'border-top: 3px solid #3AC0F6;' +
                      'box-shadow: -2px 2px 3px rgba(0,0,0,.17);' +
                      'position: absolute; top: 10px; right: 10px;' +
                      'font-family: tahoma, arial, sans-serif; z-index: 1100000000; line-height: 16px;}' +
                  '.papaly-click-notice .papaly-notice-text {' +
                    'font-size: 13px;' +
                    'float: left;' +
                    'padding: 15px;' +
                    'border-right: 1px solid #D4D5D6;}' +
                  '.papaly-click-notice .papaly-notice-close-button {' +
                    'float: right;' +
                    'position: relative;' +
                    'width: 44px;' +
                    'height: 46px;}' +
                  '.papaly-click-notice .papaly-notice-close-button-img { position: absolute; top: 0px; right: 0px; left: 0; bottom: 0; margin: auto; width: 8px;}' +
                  '.papaly-click-notice .papaly-notice-clickable {' +
                    'cursor: pointer;}' +
                  '.papaly-click-notice .papaly-notice-clickable:hover {' +
                      'background-color: #f5f5f5;}' +
                  '.papaly-click-notice .papaly-notice-clear-float {' +
                    'clear: both;}';
s.appendChild(style);
// document.body.appendChild(style);
document.body.appendChild(s);
// Make the suggestion go away after a few seconds.
setTimeout(function() {
  if (s && s.parentNode) {
    // s could have been removed if clicked in the following onclick
    s.parentNode && s.parentNode.removeChild(s);
  }
}, 10000);

// Click clost button to close the notice
s.querySelector('.papaly-notice-close-button').onclick = function() {
  // Hide the Suggestion popup notice
  remove_papaly_notices();
  // Tell the Background page to change the interval time
  chrome.runtime.sendMessage({
    messageId: 'contentSuggestionClose'
  });
};


// Register on click listener, which sends a message to background page. The
// background page then handles the communication with the server.
s.querySelector('.papaly-notice-text').onclick = function() {
  // First we remove the suggesting itself
  s.parentNode && s.parentNode.removeChild(s);
  // Create the item
  var url = 'https://papaly.com/items/create_from_url' +
    '?url=' + encodeURIComponent(document.location.toString()) +
    '&name=' + encodeURIComponent(document.title) +
    '&from=add_suggested_to_papaly';
  console.log(url);
  var xhReq = new XMLHttpRequest();
  xhReq.open('PUT', url, true);

  xhReq.onreadystatechange = function() {
    if (xhReq.readyState == 4) {
      var item = xhReq.responseText;
      if (item != undefined) {
        item = item.trim();
        // Notify background about the new item
        chrome.runtime.sendMessage({
          messageId: 'itemAdded',
          item: item,
          timestamp: xhReq.getResponseHeader('date'),
          from: 'content_suggestion'
        });
      }
    }
  };

  try {
    xhReq.send(null);
  } catch (e) {
  }
  // Show the message that something is created.
  var e = document.createElement('div');
  e.id = 'papaly-' + new Date().getTime();
  e.className = 'papaly-notice';
  e.innerHTML = '<div class="papaly-click-notice">' +
                  '<div class="papaly-notice-text">Link added to <img width="61px;" style="position: relative; vertical-align: text-top; margin-left: 6px;" src="https://papaly.com/assets/logo-41602eefb2908e739d4cf121250fd7c0.png" alt="Papaly"/></div>' +
                  '<div class="papaly-notice-close-button papaly-notice-clickable"><img class="papaly-notice-close-button-img" src="https://papaly.com/assets/ui_icons/edit-delete-070a461050632049d822adffff17a993.png" alt="close"></div>' +
                  '<div class="papaly-notice-clear-float"></div>' +
                '</div>';
  var style = document.createElement('style');
  style.innerHTML = '.papaly-click-notice {' +
                        'background-color: #fff; background-color: rgba(255,255,255,.93);' +
                        'border: 1px solid #D4D5D6;' +
                        'border-top: 3px solid #3AC0F6;' +
                        'box-shadow: -2px 2px 3px rgba(0,0,0,.17);' +
                        'position: absolute; top: 10px; right: 10px;' +
                        'font-family: tahoma, arial, sans-serif; z-index: 1100000000; line-height: 16px;}' +
                    '.papaly-click-notice .papaly-notice-text {' +
                      'font-size: 13px;' +
                      'float: left;' +
                      'padding: 15px;' +
                      'border-right: 1px solid #D4D5D6;}' +
                    '.papaly-click-notice .papaly-notice-close-button {' +
                      'float: right;' +
                      'position: relative;' +
                      'width: 44px;' +
                      'height: 46px;}' +
                    '.papaly-click-notice .papaly-notice-close-button-img { position: absolute; top: 0px; right: 0px; left: 0; bottom: 0; margin: auto; width: 8px;}' +
                    '.papaly-click-notice .papaly-notice-clickable {' +
                      'cursor: pointer;}' +
                    '.papaly-click-notice .papaly-notice-clickable:hover {' +
                        'background-color: #f5f5f5;}' +
                    '.papaly-click-notice .papaly-notice-clear-float {' +
                      'clear: both;}';
  e.appendChild(style);
  document.body.appendChild(e);
  e.querySelector('.papaly-notice-close-button').onclick = remove_papaly_notices;

  setTimeout(function() {
    e.parentNode && e.parentNode.removeChild(e);
  }, 5000);
};

// Remove existing suggestion if there is any
function remove_papaly_notices() {
  var papaly_notices = document.getElementsByClassName('papaly-notice');
  while (papaly_notices[0]) {
    papaly_notices[0].parentNode.removeChild(papaly_notices[0]);
  }
}
