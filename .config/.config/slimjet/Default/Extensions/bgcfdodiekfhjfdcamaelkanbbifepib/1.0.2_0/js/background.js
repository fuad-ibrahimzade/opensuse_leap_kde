chrome.browserAction.onClicked.addListener(function (tab) {
    var allowed = ['http:', 'https:', 'file:', 'ftp:'];
    if (allowed.indexOf(tab.url.split('//')[0]) !== -1 && tab.url.indexOf('https://chrome.google.com/webstore/') === -1) {
      chrome.tabs.executeScript(tab.id, {
          "file": "js/content.js"
      });
    } else {
      alert('Sorry we cannot make changes to this page per Google\'s policies');
    }
});
