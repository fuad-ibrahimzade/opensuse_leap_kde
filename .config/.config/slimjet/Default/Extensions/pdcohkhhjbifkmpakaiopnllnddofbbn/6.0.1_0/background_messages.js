// This javascript handles all the messages between components of this
// extension. For content scripts, they do not in general have access to any
// chrome API. Hence to create an item on Papaly, and then to trigger a
// synchronization between the server and the background page, we need to send
// a signal to the background page.

// Master message dispatcher. Depending on the message got, call different
// functions to deal with it.
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // console.log(message);
  switch (message.messageId) {
    case 'itemAdded':
      // Case when we show the suggestion in content script (rare event), we
      // send a message to background page to create the item. The content
      // script can talk to the server, but we do it here instead to make it
      // consistent. And this implementation will make sure that the last newtab
      // and the background page are synchronized.
      // Check content_suggestion for reference.
      var item = mapHtml(message.item);
      item = item.trim();
      chrome.extension.getBackgroundPage().add_item_to_docs(item, null, message.timestamp);
      updateIconForCurrentTab();
      // Decrease interval if suggestion works.
      if (message.from == 'content_suggestion') {
        papaly_suggestion_interval = Math.round(papaly_suggestion_interval / 2);
        if (papaly_suggestion_interval < 1000 * 3600 * 12) {
          papaly_suggestion_interval = 1000 * 3600 * 12;
        }
        papaly_suggestion = (new Date()).getTime();
        // Save the records in storage
        chrome.storage.local.set({
          'papaly_suggestion': papaly_suggestion,
          'papaly_suggestion_interval': papaly_suggestion_interval
        });
      }
      break;
    case 'contentSuggestionClose':
      // User saw the "Add to Papaly" content suggestion but closed it
      // Increase the interval, up to a max
      papaly_suggestion_interval = Math.round(papaly_suggestion_interval * 1.5);
      if (papaly_suggestion_interval > 1000 * 3600 * 100) {
        papaly_suggestion_interval = 1000 * 3600 * 100;
      }
      papaly_suggestion = (new Date()).getTime();
      // Save the records in storage
      chrome.storage.local.set({
        'papaly_suggestion': papaly_suggestion,
        'papaly_suggestion_interval': papaly_suggestion_interval
      });
      break;
    case 'searchKeyword':
      // Case when user searches a keyword on Google/Bing, we show some
      // the items within Papaly if user choose to.
      // Check content_search.js for reference
      // console.log(message.keyword);
      var papaly_obj = get_search_candidates(message.keyword);
      // console.log(papaly_obj);
      sendResponse(papaly_obj);
      break;
    case 'toggleSearch':
      // This one works with the searchKeyword choice. If user like it or not
      // They can choose to disable or re-enable the search.
      send_http_request_async(HOST_HTTPS + '/st/cst?source=xtn-chrome&occasion=' + message.keyword);
      // Kills search embedding for the rest of the session
      papaly_search_start = new Date().getTime() + 1000 * 3600 * 24 * 365;
      if (message.keyword == 'ever') {
        // Snooze it for a week initially, doubling thereafter
        chrome.storage.local.set({
          'papaly_search_start': new Date().getTime() + papaly_search_interval,
          'papaly_search_interval': papaly_search_interval * 2
        }, function() {
          // console.log(new Date().toISOString() + ": " + " search property set in token storage");
        });
      }
      break;
    case 'importChrome':
      // Takes care of the "import from bookmarks" function. If user uses
      // Chrome, then we allow them to import directly from Chrome bookmarks.
      // The override is run on content_import.js which sends a message here
      // and then calls the Chrome API to get the bookmarks.
      if (message.type == 'bookmarks') {
        import_chrome_bookmarks(message.board_id, function(response) {
          sendResponse(response);
        });
      } else if (message.type = 'apps') {
        import_chrome_apps(message.board_id, function() {
          console.log('Calling callback');
          sendResponse(true);
        });
      }
      // Return true to keep the channel alive because import takes a while
      return true;
      break;
    default:
      break;
  }
});


////////////////////////////////////////////////////////////////////////////////
// Functions related to showing Papaly items when user search for it.
// The papaly_search_start and papaly_search_interval decides whether to show
// it or not.
// We want the search results to be shown but if user doesn't like it, it
// should be snoozed at an increasing interval.
// papaly_search_start is a timestamp for when the search should show
var papaly_search_start = new Date().getTime();
// papaly_search_interval decides whether it should be shown
var papaly_search_interval = 1000 * 3600 * 24 * 7;
chrome.storage.local.get(['papaly_search_start', 'papaly_search_interval'], function(items) {
  if (items['papaly_search_start'] != undefined) {
    papaly_search_start = items['papaly_search_start'];
    // console.log(new Date().toISOString() + ": " + "search enable pulled from token storage " + papaly_search_start);
  }
  if (items['papaly_search_interval'] != undefined) {
    papaly_search_interval = items['papaly_search_interval'];
    // console.log(new Date().toISOString() + ": " + "search interval pulled from token storage" + papaly_search_interval);
  }
});

// In case if user likes, this function goes through last Papaly new tab to
// find candidates. Notice that we can only send back json so here we get an
// array of objects.
function get_search_candidates(kwd) {
  // Still within the no-show time, return nothing
  // Or keyword is missing or too short
  if (papaly_search_start > new Date().getTime() ||
      !kwd || kwd.trim().length < 2) {
    return { shortcuts: [], items: [] };
  }
  // Prepare the keywords
  var kwds = kwd.trim().split(/\s+/);

  // If an item and a shortcut share a URL, the shortcut wins
  var shortcuts_unique = {};
  var items_unique = {};

  keyword_search(DOC.querySelectorAll('.shortcut-module'), kwds, function(shortcut) {
    var ahref = shortcut.querySelector('a[href]');
    var url = ahref && ahref.href; // This is better than url due to a tag.
    // Ignores http(s) protocol and trailing / when checking uniqueness
    var mangled_url = url && url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    if (!mangled_url) {
      return;
    }
    // Add to the known list if unknown, we do not want duplicates
    if (!shortcuts_unique[mangled_url]) {
      var shortcut_name = shortcut.getElementsByClassName('shortcut-name')[0].textContent;
      var shortcut_index = shortcut.getAttribute('item-index');

      var params = {
        source: 'xtn-chrome',
        from: 'xtn-search',
        index: shortcut_index,
        title: shortcut_name,
        url: url,
        type: 'shortcut'
      };
      var shortcut_href = HOST_HTTPS + '/items/click?' + $.param(params);
      var icon_style = shortcut.getElementsByClassName('shortcut-icon')[0].getAttribute('style');
      // Add <b> highlighting for the matched keywords
      var regex = new RegExp('(' + kwds.join('|') + ')', 'ig');
      var shortcut_name_highlighted = shortcut_name.replace(regex, '<b>$1</b>');
      // Push the papaly data.
      shortcuts_unique[mangled_url] = {
        url: shortcut_href,
        icon: icon_style,
        name: shortcut_name_highlighted,
        title: shortcut_name
      };
    }
  });
  keyword_search(DOC.querySelectorAll('.item-bookmark'), kwds, function(item) {
    var ahref = item.querySelector('a[href]');
    var url = ahref && ahref.href;
    if (!url) {
      return;
    }
    // Ignores http(s) protocol and trailing / when checking uniqueness
    var mangled_url = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    // Checks both items and shortcuts for duplicates
    if (!items_unique[mangled_url] && !shortcuts_unique[mangled_url]) {
      var item_name = item.getElementsByClassName('item-name')[0].textContent;
      var item_index = item.getAttribute('item-index');

      var params = {
        source: 'xtn-chrome',
        from: 'xtn-search',
        index: item_index,
        title: item_name,
        url: url,
        type: 'item'
      };
      var item_href = HOST_HTTPS + '/items/click?' + $.param(params);
      var icon_style = item.getElementsByClassName('item-icon')[0].getAttribute('style');
      // Add <b> highlighting for the matched keywords
      var regex = new RegExp('(' + kwds.join('|') + ')', 'ig');
      var item_name_highlighted = item_name.replace(regex, '<b>$1</b>');
      // Push the papaly data.
      items_unique[mangled_url] = {
        url: item_href,
        icon: icon_style,
        name: item_name_highlighted,
        title: item_name
      };
    }
  });

  var shortcuts = Object.keys(shortcuts_unique).map(function(a) {return shortcuts_unique[a];});
  shortcuts.sort(function(a, b) {
    var a_title = a.title.toLowerCase();
    var b_title = b.title.toLowerCase();
    return a_title < b_title ? -1 : a_title == b_title ? 0 : 1;
  });
  var items = Object.keys(items_unique).map(function(a) {return items_unique[a];});
  items.sort(function(a, b) {
    var a_title = a.title.toLowerCase();
    var b_title = b.title.toLowerCase();
    return a_title < b_title ? -1 : a_title == b_title ? 0 : 1;
  });
  return { shortcuts: shortcuts, items: items };
}

// Helper function which searches through the keywords of a node_list and yields to each match
function keyword_search(node_list, keywords, match_callback) {
  Array.prototype.forEach.call(node_list, function(node) {
    var node_keyword = node.textContent;
    node_keyword = node_keyword && node_keyword.toUpperCase().trim();
    var ahref = node.querySelector('a[href]');
    ahref = ahref && ahref.href; // This is better than url due to a tag
    if (ahref && node_keyword) {
      var matched = keywords.every(function(kwd) {
        return node_keyword.match(kwd.toUpperCase());
      });
      if (matched) {
        match_callback(node);
      }
    }
  });
}

// Import function that takes a json input and talk to the server. It would
// call the callback after everything is done.
function import_bookmark_from_json(data, board_id, callback) {
  data['board_id'] = board_id;
  data['source'] = 'xtn-chrome';
  //console.log(new Date().toISOString() + ": " + chrome.extension.getBackgroundPage().CSRF_TOKEN);
  $.ajax({
    type: 'POST',
    dataType: 'html',
    url: HOST_HTTPS + '/import_bookmark',
    data: data,
    success: function(data) {
      callback();
    },
    error: function(j, t, e) {
      callback();
    }
  });
}

// Deprecating
// Import Chrome Apps
function import_chrome_apps(board_id, callback) {
  import_bookmark_from_json({
    'chromeapp_json': chrome.extension.getBackgroundPage().get_chrome_app_json()
  },
  board_id,
  callback);
}

// We re-fetch the bookmarks so that those added since startup also get included
function import_chrome_bookmarks(board_id, callback) {
  get_suggestion_from_bookmarks(function(result) {
    background_suggestions_chrome_bookmarks = result;
    var data = {
      bookmark_json: JSON.stringify(result),
      board_id: board_id,
      source: 'xtn-chrome'
    };
    callback(data);
  });
}

function cache_boards() {
  // Get all board_ids;
  var board_ids = [];
  $(DOC).find('#nav-your-boards .nav-section-item').each(function() {
    board_ids.push($(this).attr('board-id'));
  });
  // Get rid of the boards that the DOC already has.
  if (DOC != document) {
    var boards = $(DOC).find('.board');
  } else {
    var boards = $('#homepage').find('.board');
  }
  // Now pull the existing board_ids
  boards.each(function() {
    var board_id = $(this).attr('board-id');
    var board_id_idx = -1;
    while ((board_id_idx = board_ids.indexOf(board_id)) !== -1) {
      board_ids.splice(board_id_idx, 1);
    }
  });
  // No point of caching if nothing to load
  if (!board_ids.length) {
    return;
  }
  // No parameter renders all user boards.
  $.ajax({
    type: 'GET',
    url: HOST_HTTPS + '/boards/cache',
    data: {
      board_ids: board_ids
    },
    success: function(response_html) {
      // The current board will be visible, which triggers load of images
      $('#backgroundboards').html($(mapHtml(response_html)).filter('.board').hide());
    }
  });
}
