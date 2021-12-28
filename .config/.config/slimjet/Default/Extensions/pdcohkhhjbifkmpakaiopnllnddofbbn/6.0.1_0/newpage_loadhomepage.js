// Our newtab is rendered dynamically upon start. It does the following things:
// 1. If new newtab, pull the HTML from somewhere so that user sees no delay.
//    And it makes sure that things are binded correctly.
// 2. If not new newtab, update the HTML. Also make sure it binds correctly.

console.log(new Date().toISOString() + ': ' + 'beginning of time in newpage');

// Bind the onload
var reload = document.getElementById('newtab-initial-page-reload');
if (reload) {
  reload.onclick = function() {
    chrome.runtime.reload();
  };
}

// For the users who opt-out for our chrome://newtab override. We show the
// regular default Google newtab page.
function load_correct_newtab() {
  switch (chrome.extension.getBackgroundPage().newtab.setting) {
    case 'custom':
      var url = chrome.extension.getBackgroundPage().newtab.custom_url;
      if (!url) {
        url = 'about:blank';
      } else if (!url.match(/:/)) {
        // Chrome treats urls without protocol as relative to our extension
        // so we add http to it
        url = 'http://' + url;
      }
      chrome.tabs.update({url: url});
      break;
    case 'chrome':
      chrome.tabs.update({url: 'https://www.google.com/_/chrome/newtab'});
      break;
    case 'blank':
      chrome.tabs.update({url: 'about:blank'});
      break;
    default:
      var loading = document.getElementById('newtab-initial-content');
      if (loading) {
        // This makes it visible
        loading.removeAttribute('style');
      }
      update_title();
      loadhomepage6();
  }
}

// Updates the title from New Tab to current title
function update_title() {
  var DOC = chrome.extension.getBackgroundPage().DOC;
  var title = DOC && DOC.title || 'New Tab';
  // This serves as a failsafe in case a page hasn't finished loading
  if (title == 'New Tab') {
    title = 'Papaly | Personalized Social Bookmarking';
  }
  document.title = title;
}

// The background page should have a variable about whether user wants to
// see Papaly newtab or Google newtab. But that won't be ready until a few
// hundred millseconds. For this reason, the very first newtab will be broken.
// For example, if a user closes all Chrome tabs, leaves only one newtab,
// then he/she closes and restarts Chrome. In this case, the very first newtab
// will get a Papaly newtab instead of Google newtab. Hence we wrap the newtab
// related steps inside a chrome.storage callback so that for the very first
// newtab, user's own choice is still honored.
if (chrome.extension.getBackgroundPage().BACKGROUND_READY) {
  load_correct_newtab();
} else {
  chrome.storage.sync.get('newtab', function(items) {
    if (is_object(items['newtab'])) {
      chrome.extension.getBackgroundPage().newtab = items['newtab'];
    } else if (items['newtab'] == 'google') {
      // Legacy support
      chrome.extension.getBackgroundPage().newtab = {
        setting: 'chrome',
        custom_url: ''
      };
      // Updates the old syntax to new form
      // so we can eventually drop legacy support 12/12/15
      chrome.storage.sync.set('newtab', chrome.extension.getBackgroundPage().newtab);
    }
    load_correct_newtab();
  });
}

// Cleans up errant javascript from replacing the DOM prematurely
// after the fact by removing duplicates
setTimeout(function() {
  var sources = {};
  var scripts = Array.prototype.slice.call(document.querySelectorAll('script'));
  scripts.forEach(function(script) {
    if (sources[script.src]) {
      script.remove();
    } else {
      sources[script.src] = script.src;
    }
  });
}, 1000);
