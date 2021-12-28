// This file takes care of saving a 'papaly_once' true/false token in the
// storage. If user just installed Papaly, we show a newtab for them to start
// the registration/guest process. So this is supposed to run only once per
// installation.
chrome.storage.local.get('papaly_runonce', function(items) {
  if (items['papaly_runonce'] == undefined) {
    // console.log(new Date().toISOString() + ": " + "first time");
    chrome.storage.sync.get('papaly_token', function(items) {
      if (items['papaly_token'] == undefined) {
        papaly_firsttime();
      } else {
        // Do nothing here, user is a known user.
      }
    });
  } else {
    // console.log(new Date().toISOString() + ": " + "not really first time");
  }
});

// Here since first time, we are guaranteed to be not logged in
// Register a new user and go ahead refreshing this extension.
// The login page is confusing to many user, showing the main interface makes
// more sense.
function papaly_firsttime() {
  // The data is already a stringified JSON, only need to escape '&' and others.
  var data = 'chromeapp_json=' + encodeURIComponent(chrome.extension.getBackgroundPage().get_chrome_app_json());
  // Async request
  var xhReq = new XMLHttpRequest();
  xhReq.open('POST', HOST_HTTPS + '/guest?source=xtn-chrome&first_time=true', true);
  // When done, reload homepage with the signed in user.
  xhReq.onreadystatechange = function() {
    if (xhReq.readyState == 4) {
      // Server should respond with homepage, async call, takes care of everything
      load_homepage_background(xhReq.responseText, function() {
        // Open a new tab
        chrome.tabs.create({url: 'chrome://newtab'}, function() {
          //console.log(new Date().toISOString() + ": " + 'first time, showing newtab');
        });
      });
      chrome.storage.local.set({'papaly_runonce': true}, function() {
        //console.log(new Date().toISOString() + ": " + "don't show this again");
      });
    }
  };
  // Now send the XMLHttpRequest
  xhReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  try {
    xhReq.send(data);
  } catch (e) {
    console.log(new Date().toISOString() + ': ' + 'error sending http request for firsttime');
    console.log(e);
  }
}
