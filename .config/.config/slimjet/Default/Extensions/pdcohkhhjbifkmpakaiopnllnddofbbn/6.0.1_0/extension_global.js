var HOST = 'papaly.com';
var HOST_HTTP = 'https://' + HOST;
var HOST_HTTPS = 'https://' + HOST;

// map the urls to the correct values
function mapHtml(ret) {
  if (!ret) {
    return ret;
  }
  // Mapping relative assets to absolute path
  ret = ret.replace(new RegExp('([\'"(])((https?:)?//' + HOST + ')?/assets/', 'g'), '$1' + HOST_HTTPS + '/assets/');
  ret = ret.replace(new RegExp('([\'"(])((https?:)?//' + HOST + ')?/system/', 'g'), '$1' + HOST_HTTPS + '/system/');
  // Mapping image and script to https with absolute path
  ret = ret.replace(new RegExp('src="((https?:)?//' + HOST + ')?/([^/])', 'g'), 'src="' + HOST_HTTPS + '/$3');
  // // If to homepage, then map to newpage. Maybe deprecate this
  // ret = ret.replace(new RegExp('href="((https?:)?//' + HOST + ')?/"', 'g'), 'href="chrome://newtab"');
  // Map ahref links
  ret = ret.replace(new RegExp('href="((https?:)?//' + HOST + ')?/', 'g'), 'href="' + HOST_HTTPS + '/');
  ret = ret.replace(new RegExp('url="((https?:)?//' + HOST + ')?/', 'g'), 'url="' + HOST_HTTPS + '/');
  // Map form action links
  ret = ret.replace(new RegExp('action="((https?:)?//' + HOST + ')?/', 'g'), 'action="' + HOST_HTTPS + '/');
  // Map amazon s3 to https scheme
  ret = ret.replace(new RegExp('(https?:)?//s3.amazon', 'g'), 'https://s3.amazon');
  // Map the url for background images
  ret = ret.replace(new RegExp('url\\(//', 'g'), 'url(https://');

  return ret;
}

// Replace head manually without document.head=data
function replace_head(data, callback) {
  console.log(new Date().toISOString() + ': ' + 'replace head');
  // Handle title
  var title = data.match(/<\s*title\s*>([\s\S]*)<\s*\/title\s*>/);
  if (title != undefined) {
    document.title = title[1];
  }

  // Handle meta
  var new_metatags = data.match(/<meta.*\/>/g) || [];
  for (var i = 0; i < new_metatags.length; i++) {
    var name = new_metatags[i].match(/name=['"]([^'"]*)['"]/);
    var content = new_metatags[i].match(/content=['"]([^'"]*)['"]/);
    if (name != undefined && content != undefined) {
      set_head_tag('meta', 'name', name[1], 'content', content[1]);
    }
  }

  // only replace css when necessary
  // Handle css
  var dcss = [];
  var ecss = document.head.getElementsByTagName('link');
  for (var i = 0; i < ecss.length; i++) {
    var e = ecss[i];
    if (e.rel == 'stylesheet') {
      dcss.push(e);
    }
  }
  // now pull the new links
  var new_links = data.match(/<link.*\/>/g);
  var ncss = [];
  if (new_links) {
    for (var i = 0; i < new_links.length; i++) {
      var href = new_links[i].match(/href=['"]([^'"]*)['"]/);
      var media = new_links[i].match(/media=['"]([^'"]*)['"]/);
      var rel = new_links[i].match(/rel=['"]([^'"]*)['"]/);
      var type = new_links[i].match(/type=['"]([^'"]*)['"]/);
      var e = document.createElement('link');
      e.href = href ? href[1] : '';
      e.media = media ? media[1] : '';
      e.rel = rel ? rel[1] : '';
      e.type = type ? type[1] : '';
      if (e.rel == 'stylesheet') {
        document.head.appendChild(e);
        ncss.push(e);
      }
    }
  }

  if (ncss.length > 0 && callback) {
    var e = ncss[ncss.length - 1];
    e.onload = function() {
      callback();
    };
  } else if (callback) {
    callback();
  }

  // now remove existing css
  setTimeout(function() {
    for (var i = 0; i < dcss.length; i++) {
      if (dcss[i].parentElement && !dcss[i].href.match('application.css')) {
        dcss[i].parentElement.removeChild(dcss[i]);
      }
    }
  }, 1000);
}

// Get the meta tag by filter
function get_head_tag(tag, filterAttrName, filterAttrValue, attrName) {
  var meta_tags = document.head.getElementsByTagName(tag);
  for (var i = 0; i < meta_tags.length; i++) {
    if (meta_tags[i].getAttribute(filterAttrName) == filterAttrValue) {
      return meta_tags[i].getAttribute(attrName);
    }
  }
  return undefined;
}

// Set the meta tag by filter
function set_head_tag(tag, filterAttrName, filterAttrValue, attrName, attrValue) {
  var meta_tags = document.head.getElementsByTagName(tag);
  for (var i = 0; i < meta_tags.length; i++) {
    if (meta_tags[i].getAttribute(filterAttrName) == filterAttrValue) {
      meta_tags[i].setAttribute(attrName, attrValue);
      return;
    }
  }
  // no matching tag there
  var new_metatag = document.createElement('meta');
  new_metatag.setAttribute(filterAttrName, filterAttrValue);
  new_metatag.setAttribute(attrName, attrValue);
  document.head.appendChild(new_metatag);
  return;
}

// check if the page is reasonable
function check_page_valid(html) {
  return html && html.match(/(app-loading)|(block-page)/);
}

// dynamically load a javascript
function papaly_load_js(src, callback) {
  var e = document.createElement('script');
  e.src = src;
  e.type = 'text/javascript';
  if (callback) {
    e.onload = function() {
      callback();
    };
  }
  document.body.appendChild(e);
}

// load a bunch of js sequentially
function papaly_load_jss(srcs) {
  // console.log(srcs);
  if (typeof srcs.shift != 'function') {
    return;
  }
  var src = srcs.shift();
  if (src == undefined) {
    return;
  }
  papaly_load_js(src, function() {
    papaly_load_jss(srcs);
  });
}

// replace_csrf_token
function replace_csrf_token_in_document(token) {
  // check if token is reasonable
  if (typeof token != 'string' || token.length != 44) {
    return;
  }
  // fix the CSRF_TOKEN in the context
  if (typeof CSRF_TOKEN != undefined) {
    CSRF_TOKEN = token;
  }
  // now fix the document
  if (document) {
    // token in the form of <meta content=​"ikRYIZ+viFp9a1t0reemE/​3EV3/​+UhHpAeDSX99FtsQ=" name=​"csrf-token">​
    var metas = document.getElementsByTagName('meta');
    for (var i = 0; i < metas.length; i++) {
      if (metas[i].name == 'csrf-token') {
        metas[i].value = token;
      }
    }
    // token in the form of <input name=​"authenticity_token" type=​"hidden" value=​"AMwXa0G4PIVaBPdq3DtIpTzGXLq/​Y2DL2jG/​pciP2Ro=">​
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].name == 'authenticity_token') {
        inputs[i].value = token;
      }
    }
  }
}

function send_http_request_sync(url) {
  var xhReq = new XMLHttpRequest();
  xhReq.open('GET', url, false);
  try {
    xhReq.send(null);
  } catch (e) {
    console.log(new Date().toISOString() + ': ' + 'error sending http request for ' + url);
    return undefined;
  }

  serverResponse = xhReq.responseText;
  return serverResponse;
}

function send_http_request_async(parameters, callback) {
  if (typeof parameters == 'string') {
    parameters = {
      url: parameters,
      method: 'GET'
    };
  }
  if (parameters.method == undefined) {
    parameters.method = 'GET';
  }

  var xhReq = new XMLHttpRequest();
  xhReq.open(parameters.method, parameters.url, true);
  xhReq.onreadystatechange = function() {
    if (xhReq.readyState == 4) {
      callback(xhReq.responseText, xhReq.getResponseHeader('date'));
    }
  };
  try {
    xhReq.send(null);
  } catch (e) {
    console.log(new Date().toISOString() + ': ' + 'error sending http request for ' + url);
    return undefined;
  }
  return;
}

function try_call(fn) {
  if (typeof(window[fn]) == 'function') window[fn]();
}

document.referrer = 'xtn-chrome-' + chrome.app.getDetails().version;
// console.log(new Date().toISOString() + ": " + "end of extension_global.js");
