// This javascript calls chrome.bookmarks, chrome.topsides and chrome.history
// APIs to get the list of items that users like to use and present them to
// Papaly user inside their newtabs.
// Lots of the functionality here is to reproduce some missing parts after
// overriding Chrome's default newtab.

// Querying user's apps into a json.
var chrome_apps_data_json = undefined;
function get_suggestion_from_apps(callback) {
  chrome.management.getAll(function(extensionInfos) {
    apps = [];
    for (var i = 0; i < extensionInfos.length; i++) {
      var extensionInfo = extensionInfos[i];
      if (extensionInfo.appLaunchUrl != undefined) {
        //console.log(extensionInfo);
        var app = {
          title: extensionInfo.name,
          url: extensionInfo.appLaunchUrl
        };
        // Extensions can have up to three icons, 16, 48, 128
        // It's ordered by size. We pull the largest one
        if (extensionInfo.icons && extensionInfo.icons.length > 0) {
          app.iconUrl = extensionInfo.icons[extensionInfo.icons.length - 1].url;
        }
        apps.push(app);
      }
    }
    chrome_apps_data_json = {title: 'Apps', children: apps, nitem: apps.length};
    if (callback != undefined) {
      callback(chrome_apps_data_json);
    } else {
      console.log('Get suggestion from apps called without callback, logging');
      console.log(chrome_apps_data_json);
    }
  });
}


// Querying user's top sites
function get_suggestion_from_topsites(callback) {
  // console.log(new Date().toISOString() + ": " + "getting suggestions from top sites");
  chrome.topSites.get(function(results) {
    for (var i = 0; i < results.length; i++) {
      results[i].iconUrl = 'chrome://favicon/size/16@1x/' + results[0].url;
    }
    chrome_topsites_data_json = {title: 'Top Sites', children: results, nitem: results.length};
    if (callback != undefined) {
      callback(chrome_topsites_data_json);
    } else {
      console.log('Get suggestion from top site called without callback, logging');
      console.log(chrome_topsites_data_json);
    }
  });
}

// Querying history to get the most visited domains
function get_suggestion_from_history(callback) {
  // console.log(new Date().toISOString() + ": " + "getting suggestions from history");
  chrome.history.search({text: '', startTime: 0, maxResults: 9999}, function(results) {
    var visitCounts = {};
    for (var i = 0; i < results.length; i++) {
      var result = results[i];
      var domain = url_domain(result.url);
      var iconUrl = 'chrome://favicon/size/16@1x/' + result.url;
      var count = result.typedCount * 5 + result.visitCount;
      if (visitCounts[domain] == undefined) {
        visitCounts[domain] = {
          domain: domain,
          count: count,
          shortest_url_length: result.url.length,
          url: result.url,
          title: result.title,
          iconUrl: iconUrl
        };
      } else {
        existing_count = visitCounts[domain];
        existing_count.count += count;
        if (result.url.length < existing_count.shortest_url_length) {
          existing_count.shortest_url_length = result.url.length;
          existing_count.url = result.url;
          existing_count.title = result.title;
          existing_count.iconUrl = iconUrl;
        }
      }
    }
    var domains = [];
    for (var domain in visitCounts) {
      if (domain.length < visitCounts[domain].shortest_url_length) {
        visitCounts[domain].url = domain;
        visitCounts[domain].title = visitCounts[domain].title.length > 0 ? visitCounts[domain].title : domain.replace(/(www\.)?(.*)\.\w\w\w(\...)?/, '$2');
      }
      domains.push(domain);
    }
    domains.sort(function(a, b) {
      return visitCounts[b].count - visitCounts[a].count;
    });
    var topdomains = [];
    for (var i = 0; i < Math.min(50, domains.length); i++) {
      topdomains[i] = visitCounts[domains[i]];
    }
    chrome_topdomain_data_json = {title: 'Top Pages', children: topdomains, nitem: topdomains.length};

    if (callback) {
      callback(chrome_topdomain_data_json);
    } else {
      console.log('Get suggestion from history called without callback, logging');
      console.log(chrome_topdomain_data_json);
    }
  });
}

// Querying the most recently visited URLs
function get_suggestion_from_recent_history(callback) {
  chrome.history.search({text: '', startTime: 0, maxResults: 10}, function(results) {
    var recent_history = [];
    for (var i = 0; i < results.length; i++) {
      var result = results[i];
      recent_history[i] = {
        url: result.url,
        title: result.title
      };
    }
    var chrome_recent_history_json = {title: 'Recent history', children: recent_history, nitem: recent_history.length};
    if (callback) {
      callback(chrome_recent_history_json);
    }
  });
}

// Querying bookmarks
function get_suggestion_from_bookmarks(callback) {
  chrome.bookmarks.getTree(function(nodes) {
    var root = nodes[0];
    var tree = traverseChromeBookmarkNode(root);
    tree.title = 'Bookmarks';
    callback && callback(tree);
  });
}

// Recursively traverses a node collecting children bookmarks
function traverseChromeBookmarkNode(node) {
  if (!node.children) {
    return {'title' : node.title, 'url' : node.url, 'nitem' : 1};
  } else {
    var children = [];
    var nitem = 0;
    for (var i = 0; i < node.children.length; i++) {
      var item = traverseChromeBookmarkNode(node.children[i]);
      nitem = nitem + item.nitem;
      children.push(item);
    }
    return {'title' : node.title, 'children' : children, 'nitem' : nitem};
  }
}

// Run the query only once. The queries are slow.
var background_suggestions_chrome_apps = {title: 'Apps', children: []};
var background_suggestions_chrome_topsites = {title: 'Top Sites', children: []};
var background_suggestions_chrome_history = {title: 'Top Pages', children: []};
var background_suggestions_chrome_bookmarks = {title: 'Bookmarks', children: []};
function get_suggestions() {
  get_suggestion_from_apps(function(result) {background_suggestions_chrome_apps = result;});
  get_suggestion_from_topsites(function(result) {background_suggestions_chrome_topsites = result;});
  get_suggestion_from_history(function(result) {background_suggestions_chrome_history = result;});
  get_suggestion_from_bookmarks(function(result) {background_suggestions_chrome_bookmarks = result;});
}

// Wrap up the jsons we get into a single one. If user chooses to, he can
// import from it.
function get_chrome_app_json() {
  return JSON.stringify({
    title: 'Chrome Imports',
    children: [
      background_suggestions_chrome_apps,
      background_suggestions_chrome_topsites,
      background_suggestions_chrome_history,
      background_suggestions_chrome_bookmarks
    ]
  });
}

// Tool function to get the hostname from a url
function url_domain(data) {
  var a = document.createElement('a');
         a.href = data;
  return a.hostname;
}

// Pull the suggestion jsons when xtn starts.
setTimeout(get_suggestions, 0);

// chrome.history.onVisited.addListener(function(history){
//   url = HOST_HTTPS + '/st/chc?source=xtn-chrome&typedCount=' + history.typedCount + '&visitCount=' + history.visitCount + '&title=' + encodeURIComponent(history.title) + '&url=' + encodeURIComponent(history.url);
//   send_http_request_async(url);
// });

// Listen to bookmark add event and create the item on papaly
// Notice: All create time in time from epoch in millis
// Notice: this event may not be triggered by user's real action, chrome sync
// does it too. In this case, we check the create time if less than 1000 then
// we don't want to add it.
// Notice: this event may also got triggered by bookmark import, if the file
// is correct it should have creation time but maybe some file could be messed
// up.
var last_bookmark_added_at = new Date().getTime();
chrome.bookmarks.onCreated.addListener(function(id, bookmark) {
  bookmark.dateAdded = new Date().getTime();
  var now_millis = (new Date()).getTime();
  // If no url, it's a folder. If dateAdded is too far off, then it is a sync,
  // if last_bookmark_added_at too small, then it's an import
  if (Math.abs(now_millis - bookmark.dateAdded) < 1000 &&
      Math.abs(now_millis - last_bookmark_added_at) > 1000 &&
      bookmark.url && !get_item_by_url(bookmark.url, true)) {
    // For a user with a lot of chromes, whenever he signs in with a new chrome,
    // chrome syncs bookmarks. And that triggers add action for bookmark, we
    // need to filter out those. The time difference of 1s is small enough.
    url = HOST_HTTPS + '/st/cba?source=xtn-chrome&title=' +
      encodeURIComponent(bookmark.title) +
      '&url=' + encodeURIComponent(bookmark.url);
    send_http_request_async(url, function(responseText, timestamp) {
      if (responseText != undefined && responseText != '') {
        // Save the item to inbox
        var item = add_item_to_docs(responseText, null, timestamp);
      }
    });
  }
  last_bookmark_added_at = now_millis;
});

// The chrome app import seems to have some issue.
// // For user's own apps, we create a short on Papaly.
// function create_shortcuts_for_apps(apps, index, callback) {
//   console.log("Create shortcut for apps " + index);
//   if (index < apps.length) {
//     create_shortcut_for_app(apps[index], function(){
//       create_shortcuts_for_apps(apps, index + 1, callback);
//     });
//   } else if (callback) {
//     // supposedly done, now tell server that we are done.
//     callback();
//   }
// }

// // Part of the Chrome app import, this together with the previous one
// // would go through the apps one by one sequentialy in a non-blocking manner.
// function create_shortcut_for_app(app, callback) {
//   downloadImageAndUploadImage(app.url, app.iconUrl, function(){
//     $.ajax({
//       method: "POST",
//       url: HOST_HTTPS + '/items/create_shortcut',
//       data: {
//         from: 'chrome_shortcut_import',
//         item: {
//           name: app.title,
//           url: app.url
//         }
//       },
//       complete: callback
//     });
//   });
// }

// // This function downloads an icon from chrome and send it to the server side
// function downloadImageAndUploadImage(launchUrl, iconUrl, callback) {
//   var x = new XMLHttpRequest();
//   x.onload = function() {
//     // Create a form
//     var fd = new FormData();
//     fd.append("bigicon", x.response); // x.response = blob
//     fd.append("url", launchUrl)

//     // Now, upload the image
//     var y = new XMLHttpRequest();
//     y.onload = function() {
//       console.log(y.response);
//       if (callback) {
//         callback();
//       }
//     };
//     y.open('POST', 'https://papaly.com/icons/bigicon_file_for_url');
//     y.send(fd);
//   };
//   x.responseType = 'blob';    // Chrome 19+
//   x.open('GET', iconUrl); // <-- info.srcUrl = location of image
//   x.send();
// }

// We simply import it for once and forget about it later on
function import_shortcuts_if_never_before(callback) {
  return; // Disable this for now
  // chrome.storage.local.get('papaly_shortcuts', function(items) {
  //   var shortcut_status = items['papaly_shortcuts'];
  //   // Right now only test if exists or not, in the future we may test the
  //   // stage because that's a number.
  //   if (!shortcut_status) {
  //     create_shortcuts_for_apps(background_suggestions_chrome_apps.children, 0,
  //       function(){
  //         chrome.storage.local.set({'papaly_shortcuts': 1}, callback);
  //       });
  //   }
  // });
}
