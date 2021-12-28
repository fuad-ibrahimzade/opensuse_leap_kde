// This file is supposed to be main part of the background page.
// Tool functions goes to other places

// Loads user's papaly-token from storage and connect to the server for the
// latest version of the user's bookmarks on Papaly
chrome.storage.sync.get('papaly_token', function(items) {
  //console.log(new Date().toISOString() + ": " + "token in plugin is: " + AUTH_TOKEN);
  //console.log(new Date().toISOString() + ": " + "token in storage is: " + items['papaly_token']);
  if (AUTH_TOKEN == undefined) {
    AUTH_TOKEN = items['papaly_token'];
    //console.log(new Date().toISOString() + ": " + "token in plugin missing set it to be storage value: " + AUTH_TOKEN);
  } else {
    //console.log(new Date().toISOString() + ": " + "token in plugin exists: " + AUTH_TOKEN);
  }
  load_csrf_token();
  BACKGROUND_READY = true;
});

// Launches survey on uninstall
chrome.runtime.setUninstallURL(HOST_HTTPS + '/extension_uninstall_page?source=xtn-chrome');

// console.log(new Date().toISOString() + ": " + "background js loaded: ");
