// This script handles everything related to the newtab.
// We override the chrome://newtab but we want to make it faster by caching the
// page. The obvious choice is just to put things in background page. And then
// the Chrome newtab would look exactly the same as our Papaly page, but with
// extra functionalities like import from Chrome and more interaction with
// Chrome API.
// However, all of these generates a huge synchronization issue. What if user
// opens another newtab? What happens when the user closes a new tab? What we
// ended up doing is to record where the last newtab is, and pull HTML from
// there

// NEWTABS keeps track all outstanding newtabs (chrome://newtabs/)
var NEWTABS = {};
// DOC is a reference to last newtab page that the users saw
var DOC;
// The tabid for the last newtab
var LAST_NEWTAB_ID;

// Retrieves newtab settings
var newtab = {
  setting: 'papaly',
  custom_url: ''
};
chrome.storage.sync.get('newtab', function(items) {
  if (is_object(items['newtab'])) {
    newtab = items['newtab'];
  } else if (items['newtab'] == 'google') {
    // Legacy support
    newtab = {
      setting: 'chrome',
      custom_url: ''
    };
    // Updates the old syntax to new form
    // so we can eventually drop legacy support 12/12/15
    chrome.storage.sync.set('newtab', newtab);
  }
});

// This will attempt to reset last newtab (also deal with the case when it's
// the current newtab. It is called by loadhomepage to reset last newtab in
// case when the latest version of Papaly is pulled from server side. Then
// what we have there would be the correct version.
function reload_last_newtab() {
  console.log(new Date().toISOString() + ': ' + 'reload last newtab called');
  // clean up DOC
  DOC = document;

  if (NEWTABS && LAST_NEWTAB_ID && NEWTABS[LAST_NEWTAB_ID]) {
    console.log(new Date().toISOString() + ': ' + 'last new tab ID: ' + LAST_NEWTAB_ID);
    var result = NEWTABS[LAST_NEWTAB_ID](); // calling loadhomepage6, we don't want to use call() because that would send this context over
    console.log(new Date().toISOString() + ': ' + 'result: ' + result);
  }
  // Also need to check of current tab is also a new tab
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    tab = tabs[0];
    console.log(new Date().toISOString() + ': ' + 'current tab is' + (tab && tab.id));
    // If the current tab is not the tab that just got reloaded, then reload it
    if (tab && LAST_NEWTAB_ID != tab.id) {
      console.log(new Date().toISOString() + ': ' + 'we want to reload');
      tabActivatedNewPage(tab);
    }
  });
}

// Called by the newtab to clone the latest version we have across all newtabs
function cloneHomePage() {
  var to_be_returned = '';
  if (DOC && DOC != document) {
    // Case when the latest version is inside another newtab
    to_be_returned = DOC.body.innerHTML;
  } else if (DOC == document && HOMEPAGE_LOADED) {
    // Case when the latest version is the background page
    to_be_returned = document.getElementById('homepage').innerHTML + additional_scripts();
  }
  // Do a simple sanity check on the background page loaded. If somethong goes
  // wrong and we end up with an invalid newtab page, then trigger reload.
  if (!check_page_valid(to_be_returned)) {
    load_homepage_background(); // This by itself would trigger reload
    return '';
  } else {
    return to_be_returned;
  }
}

// The function called by newtab to register itself as the latest version.
// We keep a reference to the tab. And we register a bunch of listeners to make
// sure we don't have a reference to a destroyed tab to avoid memory leak and
// also to guarantee the corect version. This function does the following
// two things:
// 1. Register the document to be the last document.
// 2. Register the callback in case when user switch to that page.
function registerTabAsNewTab(tab, loadhomepage, doc) {
  if (tab != undefined && tab.id != undefined) {
    if (loadhomepage != undefined) {
      NEWTABS[tab.id] = loadhomepage;
    }
    // console.log(new Date().toISOString() + ": " +
    //   "tab registered as newtab tabid=" + tab.id)
    // Notice here that we check for main which is logged in or dialog
    // which is the login dialog. For landing page, we skip, because if
    // landing page is considered to be a good last new tab, then when at start
    // up it's going to register and when background finishes loading it will
    // skip as it is considered to be the last active good newtab.
    if (doc.getElementById('main') || doc.getElementById('dialog-container')) {
      LAST_NEWTAB_ID = tab.id;
      DOC = doc;
    } else {
      // Not sure if we want to reset, but we do not want to assign a login
      // page as the newtab because that will disable the automatic reset
      // in case when user is logged in through the cookie.
    }
  }
}

// the function that handles when a chrome://newtab is activated. It tries
// asynchronously to update the content of the newtab to match the latest
// version. And it should skip reload if current tab is the correct version.
function tabActivatedNewPage(tab) {
  // If newtab is anything but Papaly, do not track
  if (newtab.setting !== 'papaly') {
    return;
  }

  // Now take a look at the tab information
  if (!is_new_tab(tab)) {
    // Cleanup, not necessary, but let's just be robust.
    if (tab && tab.id) {
      if (NEWTABS[tab.id]) {
        delete(NEWTABS[tab.id]);
      }
      if (LAST_NEWTAB_ID == tab.id) {
        LAST_NEWTAB_ID = undefined;
      }
    }
    // No tab, or not a newtab, pass.
    return;
  }
  // We are dealing with a newtab

  // Still loading, user just opened a newtab, we do not intervene.
  if (tab.status == 'loading') {
    return;
  }

  // In case if user is switching to an existing newtab, we send a notice to
  // the newtab to update itself.
  if (NEWTABS[tab.id]) {
    NEWTABS[tab.id]();
  } else {
    // This should not happen, but just to be safe. It is a newtab, however
    // we don't really know what's going on there. Fire a reload instead.
    chrome.tabs.update(tab.id, {url: chrome.extension.getURL('newpage.html')},
      function() {
        console.log(new Date().toISOString() + ': ' +
          'tabActivatedNewPage: reload homepage');
      }
    );
  }
}

////////////////////////////////////////////////////////////////////////////////
// Register listeners to handle tab switch, destroy, etc.

// Listen to tabActivated: When switching to an existing newtab or creating
// a new one, update the contents by calling callback
chrome.tabs.onActivated.addListener(function(activeInfo) {
  // Active info only has tabId, query url to see if it's a newtab
  if (activeInfo != undefined && activeInfo.tabId != undefined) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
      tabActivatedNewPage(tab);
    });
  }
});

// When a new tab is gone and updated with a different url, remove it from
// the list of newtabs.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (NEWTABS && NEWTABS[tabId] && !is_new_tab(tab)) {
    // console.log(new Date().toISOString() + ": " +
    //   "tab updated Deregister as new tab: " + tab.url);
    delete(NEWTABS[tabId]);
  }
});

// When a newtab is closed, remove the call back
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  if (NEWTABS && NEWTABS[tabId]) {
    // console.log(new Date().toISOString() + ": " +
    //   "tab removed Deregister as new tab");
    delete(NEWTABS[tabId]);
  }
});

// When a newtab is replaced, remove the old callback
chrome.tabs.onReplaced.addListener(function(newId, tabId) {
  if (NEWTABS && NEWTABS[tabId]) {
    // console.log(new Date().toISOString() + ": " +
    //   "tab replaced Deregister as new tab");
    delete(NEWTABS[tabId]);
  }
});

// When window focus changed, say in the case there are two windows, and one
// switch from an one window to an old newtab in a different window. Then the
// tab isn't necessarily changed, so no update
// Notice there's a corner case when user switch window and switch tab at the
// same time, then the windows.onFocusChanged and onActivated will be called
// at the same time, the update will be called twice.
chrome.windows.onFocusChanged.addListener(function(windowId) {
  if (windowId == -1) {
    return; // For some reason, window id can sometimes be -1
  }
  chrome.tabs.query({active: true, windowId: windowId}, function(tabs) {
    tabActivatedNewPage(tabs[0]);
  });
});

// Trigger tabActivatedNewPage on the current tab if it is a newtab.
function papaly_activate_current_newtab() {
  chrome.tabs.query({
    active: true,
    url: 'chrome://newtab/'
  }, function(tabs) {
      tabActivatedNewPage(tabs[0]);
  });
}

// In case if the extension is just installed. Or just turned on. Or for any
// other reasons initialized with current tab being a newtab. This will trigger
// an activation and make the current tab a functioning newtab.
papaly_activate_current_newtab();

// Syncs themes by referencing the background one
var theme = 'light';
function update_theme(doc) {
  var theme_tag = $(doc).find('link[href^="theme_"');
  var href = theme_tag.attr('href');
  if (href != 'theme_' + theme + '.css') {
    theme_tag.attr('href', 'theme_' + theme + '.css');
  }
}

// Determines if a given tab should be targeted for replacement
function is_new_tab(tab) {
  return tab && tab.url && tab.url.match(/(chrome:\/\/newtab\/)|(https:\/\/www\.google\.com\/_\/chrome\/newtab)/);
}

// Official underscore isObject
function is_object(obj) {
  return obj === Object(obj);
}
