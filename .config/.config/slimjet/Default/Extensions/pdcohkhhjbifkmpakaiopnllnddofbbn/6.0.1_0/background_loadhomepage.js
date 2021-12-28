// Background page is core to Papaly extension. This function loads the homepage
// from Papaly and then
var HOMEPAGE_LOADED = false;
// Sends request to server to reload the homepage in background.html
// If serverResponse is given, load from the serverResponse, which may come from a redirect_to :root
function load_homepage_background(serverResponse, callback) {
  // console.log(new Date().toISOString() + ": " + "load homepage called");

  // If response not given, send the response in async and call it self when done.
  if (serverResponse == undefined) {
    console.log(new Date().toISOString() + ': ' + 'load homepage pulling homepage');
    send_http_request_async(HOST_HTTPS + '?source=xtn-chrome&auth_token=' + AUTH_TOKEN, function(responseText) {
      if (responseText != null) {
        load_homepage_background(responseText, callback);
      }
    });
    return;
  }

  // We have the response now
  serverResponse = mapHtml(serverResponse);

  // Parse the response. If you are changing this, please note that compressed
  // HTML will have everything in one line.
  var thead = serverResponse.match(/<\s*head[^>]*>([\s\S]*)<\s*\/head\s*>/i);
  if (thead) {
    var dhead = thead[1];
    // load head
    replace_head(dhead);
    var theme_match = dhead.match(/<link [^<>]*href="(?:https?:\/\/[^\/]*\.com)?\/assets\/theme_(\w+)(?:-[^.]+|\.self)?\.css/);
    if (theme_match) {
      theme = theme_match[1];
    }
    // Get new CSRF token from the new page
    CSRF_TOKEN = get_head_tag('meta', 'name', 'csrf-token', 'content');
    //console.log(new Date().toISOString() + ": " + "injected head load_homepage_background");

  }

  var tbody = serverResponse.match(/<\s*body[^>]*>([\s\S]*)<\s*\/body\s*>/i);
  if (tbody) {
    var dbody = tbody[1];
    // load body
    document.getElementById('homepage').innerHTML = dbody;
    HOMEPAGE_LOADED = dhead && dbody.match(/id="main"/) != null;
    console.log(new Date().toISOString() + ': ' + 'homepage loaded');
  }

  // On the condition that the load homepage is successful and we need to
  // update the tokens
  if (HOMEPAGE_LOADED) {
    LOGGED_IN = HOMEPAGE_LOADED;
  } // if not successful we wait for load_csrf_token to cleanup the LOGGED_IN

  // If the page not valid, do not continue
  if (!thead || !tbody) {
    console.log(new Date().toISOString() + ': ' +
      'load homepage no head no body something is probably wrong');
    return;
  }

  // send GA
  gas('xtn-chrome/background_loadhomepage');

  if (HOMEPAGE_LOADED) {
    // Runs once per background
    run_all_really_once_jobs();
  }
  // Reset the doc
  reload_last_newtab();
  console.log(new Date().toISOString() + ': ' + 'reload last new tab');

  // Cache boards
  cache_boards();

  // This function is in general called very infrequently:
  // If homepage load successful, update tokens just to be safe.
  // If homepage is bad but somehow we think we are logged in, need to recheck
  // tokens to make sure.
  if (HOMEPAGE_LOADED || LOGGED_IN) {
    load_csrf_token(null, callback);
  }
}

// called by the newtab to clone the login page
function cloneLoginPage() {
  console.log('Login page really????');

  // //console.log(new Date().toISOString() + ": " + "CloneLoginpage");
  // return $('#loginpage').html() + additional_scripts();

  // Alternative implementation to load from file
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', chrome.extension.getURL('background_landing.html'),
    false);
  xmlhttp.send();
  return mapHtml(xmlhttp.responseText) + additional_scripts();
}

function get_papaly_version() {
  return get_head_tag('meta', 'name', 'papaly-version-server', 'content');
}

// Here this one is used to patch the page so that when debugging, we have a
// place to go to. When the DOM script tags are gone, debugger cannot function.
// With this it would work.
function additional_scripts() {
  return '    <script src="extension_global.js"></script>\n' +
    '    <script src="newpage_loadhomepage.js"></script>\n' +
    '    <script src="application.js"></script>\n' +
    '    <script src="newpage_fix.js"></script>\n' +
    '    <script src="newpage.js"></script>\n';
}
