// This javascript takes care of user's profile for Papaly.

// Requests sent from extension do not have referer in them. For us to deal
// with the correct version, we send Chrome extension version as referer.
// Intercept the request such that it says xtn-chrome-x.x.x in the referer
chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  // console.log(new Date().toISOString() + ": " + "webRequest before header called for: " + details.url);
  details.requestHeaders.push({name: 'referer', value: 'xtn-chrome-' + chrome.app.getDetails().version});
  return {requestHeaders: details.requestHeaders};
}, { urls: ['http://' + HOST + '/*', 'https://' + HOST + '/*'] }, ['requestHeaders', 'blocking']);


// Sign in user using tokens. Some of our users want their Papaly extension to
// stay logged in even after cleaning cookie (which for them happens after
// closing Chrome). We store a token inside Chrome storage to deal with that.

var BACKGROUND_READY = false;
// We need csrf token to add item
var AUTH_TOKEN;
var CSRF_TOKEN;
var LOGGED_IN;
// This function talks to the server with the token stored inside Chrome to
// authenticate the user on Papaly. In return, the server gives the current
// login state for the user depending on the resulting token.
function load_csrf_token(hostname, callback) {
  //console.log(new Date().toISOString() + ": " + "load csrf token called");
  send_http_request_async(HOST_HTTPS + '/api/token?source=xtn-chrome&auth_token=' + AUTH_TOKEN, function(responseText) {
    if (responseText != undefined) {
      var data = JSON.parse(responseText).data;
    }

    // Deprecated code. Will be removed once we are happy with our hostname.
    // // This deals with domain transition, in case if user has a cookie from
    // // our previous domain. We will talk to the server and exchange a new
    // // token.
    // if (hostname != undefined && data.logged_in == false) {
    //   // Now try alternative server
    //   send_http_request_async(hostname + "/api/token?source=xtn-chrome&auth_token=" + AUTH_TOKEN, function(responseTextAlt){
    //     if (responseTextAlt === undefined) return;
    //     var data = JSON.parse(responseTextAlt).data;
    //     if (data.logged_in == true) {
    //       // Good, alternative sever cookie exists, retry
    //       AUTH_TOKEN = data.auth_token;
    //       load_csrf_token();
    //       return;
    //     }
    //   });
    // }

    // Take care of the csrf token, we are not using it anymore but just to be
    // safe
    CSRF_TOKEN = data.csrf_token;
    replace_csrf_token_in_document(CSRF_TOKEN);

    // Take care of the auth_token, this will be used for future login
    if (data.auth_token != undefined) {
      AUTH_TOKEN = data.auth_token;
      //console.log(new Date().toISOString() + ": " + "token set to be: " + data.auth_token);
      // Storing token
      chrome.storage.sync.set({'papaly_token': AUTH_TOKEN}, function() {
        //console.log(new Date().toISOString() + ": " + "attempted token storage");
      });
    }

    // Take care of the login status
    // Here after this handshake, we think it's established whether user has
    // an outstanding session. It's one of the following states: LOGGED_IN=
    // 1. undefined: Background initialization.
    // 2. true: Yes you are in.
    // 3. false: Definitely not logged in because server said so.
    var old_logged_in = LOGGED_IN;
    var new_logged_in = (data.logged_in == true);
    LOGGED_IN = new_logged_in;

    // Execute the callback if one is provided
    if (callback) {
      callback();
    }

    // Take care of the reload if necessary
    if (BACKGROUND_READY) { // Ignore if launching
      if (!old_logged_in && new_logged_in) {
        // Just logged in
        // If background page thinks the user to be in logout state but now user
        // is in logged in state. We want to synchronize the background page with
        // the current version of user profile on Papaly.
        load_homepage_background(); // If load csrf token shows user just logged in, reload bg
      } else if (old_logged_in && !new_logged_in) {
        // Just logged off. Expire background page and move on
        HOMEPAGE_LOADED = false;
      }
    }
  });
}

// The logout function deals with the cookie (by HTTP request) as well as
// the extension's logout state. Since we cache the user's profile, after
// regular log out, the background page still has a copy of user's Papaly
// profile. It would appear as if logout is not successful. And the following
// requests will fail due to a logged out cookie. So we need to cleanup the
// background page so that it's back to the way it is supposed to be.
function logout() {
  //console.log(new Date().toISOString() + ": " + "logout called");
  // clean the token here
  LOGGED_IN = false;
  AUTH_TOKEN = undefined;
  CSRF_TOKEN = undefined;
  HOMEPAGE_LOADED = false;
  theme = 'light';
  // messege?
  chrome.tabs.reload(LAST_NEWTAB_ID, {}, function() {
    console.log(new Date().toISOString() + ': ' + 'logged out, reload last newtab');
  });

  // Send logout
  setTimeout(function() {
    // clean the saved toke on the chrome
    chrome.storage.sync.remove(['papaly_token']);
    chrome.storage.local.remove(['papaly_shortcuts']);
    // console.log(new Date().toISOString() + ": " + "sending logout");
    // sign off from the server
    send_http_request_async(HOST_HTTPS + '/logout?source=xtn-chrome', function(responseText) {
      //console.log(new Date().toISOString() + ": " + "logging out from chrome background");
      load_csrf_token();
    });
  }, 0);
}

// We also want to deal with the case when the user signs in directly from
// the website. Hence we listen to the tab.update event. Sign in on the web
// will trigger a tab.update. That would get hit here. And we trigger a
// synchronization here.
function monitor_papaly_login(tabId, changeInfo, tab) {
  if (changeInfo && changeInfo.status === 'complete' && tab &&
      (tab.url == ('http://' + HOST + '/') ||
       tab.url == ('https://' + HOST + '/')) && !LOGGED_IN) {
    // console.log(new Date().toISOString() + ": " + "signed in in another tab for web, jump on the bandwagon");
    load_csrf_token();
  }
}
chrome.tabs.onUpdated.addListener(monitor_papaly_login);
