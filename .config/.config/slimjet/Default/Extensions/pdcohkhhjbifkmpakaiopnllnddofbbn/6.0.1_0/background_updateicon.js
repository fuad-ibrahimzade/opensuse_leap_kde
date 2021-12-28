// Updates the browserAction icon based on whether we have the url in Papaly
// or not.
function updateIcon(url, tab) {
  var item = get_item_by_url(url);
  var image = item ?
    {19: 'assets/added-19.png', 38: 'assets/added-38.png'} :
    {19: 'assets/add-19.png', 38: 'assets/add-38.png'};
  if (tab && tab.id) {
    chrome.browserAction.setIcon({path: image, tabId: tab.id});
  } else {
    chrome.browserAction.setIcon({path: image});
  }
}

// Update the browser action icon based on the given tab.
function updateIconForTab(tab) {
  // console.log(new Date().toISOString() + ": " + "updateIconForTab");
  if (tab != undefined && tab.url != undefined) {
    updateIcon(tab.url, tab);
  } else {
    updateIcon(undefined, tab);
  }
}

// Update the browser action icon based on the given tabId
function updateIconForTabId(tabId) {
  // console.log(new Date().toISOString() + ": " + "updateIconForTabId");
  if (tabId != undefined) {
    chrome.tabs.get(tabId, function(tab) {
      updateIconForTab(tab);
    });
  } else {
      updateIconForTab(undefined);
  }
}

// Trigger a refresh of the browser action icon based on current tab.
function updateIconForCurrentTab() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    updateIconForTab(tabs[0]);
  });
}

// Listen for any changes to the URL of any tab. If user enters a url in
// address bar, it's a tab.update, and we need to update the icon if necessary.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  updateIconForTab(tab);
});
// Listen to tabActivated event because user may delete the item from time to
// time. This guarantees that when they switch over, it's always up to date.
chrome.tabs.onActivated.addListener(function(activeInfo) {
  updateIconForTabId(activeInfo && activeInfo.tabId);
});
// Listen to tab creation because otherwise when new tab is created it is set
// to the original icon instead of added.
chrome.tabs.onCreated.addListener(function(tab) {
  updateIconForTab(tab);
});
// Listen to tab replace, if they enter a keyword to search, it's a replace.
chrome.tabs.onReplaced.addListener(function(addedTabId, removeTabId) {
  updateIconForTabId(addedTabId);
});
// Listen to window focus, say if there are two windows, one with a page, the
// other with a newtab, when switch from the newtab to the page, it's a focus
// change without tab.activate
chrome.windows.onFocusChanged.addListener(function(windowId) {
  return;
  if (windowId == -1) {
    return;
  }
  //console.log(new Date().toISOString() + ": " + "UpdateIcon WindowFocused");
  chrome.tabs.query({active: true, windowId: windowId}, function(tabs) {
    updateIconForTab(tabs[0]);
  });
});

