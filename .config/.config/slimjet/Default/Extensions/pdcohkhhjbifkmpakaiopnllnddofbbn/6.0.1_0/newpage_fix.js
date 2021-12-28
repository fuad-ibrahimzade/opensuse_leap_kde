// Our newtab should look exactly the same as their Papaly homepage. However
// we have some additional functionalities that needs to be overridden for the
// following reasons:
// 1. Our chrome://newtab may keep synchronizing with the server, some js will
//    get recalled over and over again, which doesn't really happen for a clean
//    web page because webpage keeps redirecting and hence is always clean.
// 2. Our users requested a lot of unique functionalities including importing
//    from Chrome bookmark, showing Chrome history, showing Chrome apps,
//    packing Chrome tabs, etc. All of those functionalities are realized by
//    overrides in this javascript.

// This function is used by the web/extension to take care of when user
// redirects to https://papaly.com/. This also serves as one way to clean up
// any problematic state we have in newtab. It serves as the fail-safe
// mechanism. It's only called upon special occations. Also, if user goes to
// https://papaly.com/, we try to show them chrome://newtab instead.
function redirect_location(new_location, serverResponse) {
  console.log(new Date().toISOString() + ': ' + 'redirect new_location: ' + new_location + ' hasdata?: ' + (serverResponse != undefined));

  // If the location is within the page, just fall back to default
  if (new_location.charAt(0) == '#') {
    document.location = new_location;
    return;
  }

  // In case if it's newtab, reload the page
  if (new_location == '/' || new_location.match(/chrome:\/\/newtab/)) {
    console.log(new Date().toISOString() + ': ' + 'special handling for homepage');
    block_app();
    chrome.extension.getBackgroundPage().load_homepage_background(serverResponse);
    return;
  }

  // Now we take care of the within page links that doesn't have the correct url
  // In the form of //hostname/adfsdf, Then it's probably something on out site
  if (new_location.match(new RegExp('^//'))) {
    new_location = new_location.replace(new RegExp('^//'), 'http://');
  }
  // Now fix the relative url and wrong scheme
  new_location = new_location.replace(new RegExp('^((https?:)?//' + HOST + ')?/', 'i'), HOST_HTTPS + '/');

  // We are dealing with some other website
  if (!new_location.match(HOST_HTTPS)) {
    chrome.tabs.update({url: new_location});
    return;
  }
  // Till this point, we are dealing with a papaly link but not /

  // In case if there's no response defined, send async request and call itself again
  if (serverResponse == undefined) {
    send_http_request_async(new_location, function(responseText) {
      if (responseText != null) {
        redirect_location(new_location, responseText);
      }
    });
    return;
  }

  // we have the response
  serverResponse = mapHtml(serverResponse);
  var thead = serverResponse.match(/<\s*head[^>]*>([\s\S]*)<\s*\/head\s*>/i);
  var tbody = serverResponse.match(/<\s*body[^>]*>([\s\S]*)<\s*\/body\s*>/i);
  var dhead = thead ? thead[1] : '';
  var dbody = tbody ? tbody[1] : '';
  // If the page not valid, do not continue
  if (!thead || !tbody) {
    console.log(new Date().toISOString() + ': ' +
      'redirect_location no head no body something is probably wrong');
    return;
  }

  // now load the page content. Notice here that we added several overrides
  // for the Chrome specific operations.
  document.body.innerHTML = dbody;

  // console.log(new Date().toISOString() + ": " + "redirect location injected body");
  register_all_listeners();
  set_ga_user_id();
  ga('send', 'pageview', '/xtn-chrome/newtab');
  chrome_newpage_special();
  run_all_delayed_jobs();

  register_as_newtab();
  chrome.extension.getBackgroundPage().HOMEPAGE_LOADED = true;
}

// redirect 401 doesn't really work for extension
function redirect_401() {
  load_dialog('/login');
}

// Add special handlers for chrome,
// Notice this one is also called when switching tabs. If you want everything to call it move it somewhere else
function chrome_newpage_special() {
  // Finally we have an override here.
  $('#pack-tabs').show().click(chrome.extension.getBackgroundPage().pack_all_tabs);
  // Add the style tag if not already there.
  add_chrome_xtn_styles();
  // Import related overrides
  $('#main')
    .on('click', '.populate-option-chrome-bookmarks', connect_import_dialog);
  register_inpage_href();
  try_call('register_login_listeners');
  try_call('close_dialog');
  try_call('check_sync');
  try_call('show_mini_link_bar');

  // Hooks up learn more
  $('#scroll-down').click(function() {
    $('html, body').animate({ scrollTop: 5 + $(window).height() }, 600);
  });

  // Fix the temp states and dnd states. This overide here is for the case when
  // user opens a new tab while dragging an item, then the item got stuck
  // because there's no mouse up event.
  cleanup_drag_and_drop_temp_states();

  // // If new ui, try to import
  // if ($('#speed-dial-section').length > 0) {
  //   chrome.extension.getBackgroundPage().import_shortcuts_if_never_before(function(){
  //     // Hook up the function that refreshes the top bar;
  //   });
  // }
  console.log(new Date().toISOString() + ': ' + 'register chrome plugin special listeners');
}

function connect_import_dialog() {
  var board_id = $(this).closest('.board').attr('board-id');
  load_dialog(null, '/dialog/import_bookmarks?board_id=' + board_id, function()
  {
    $('#import-from-chrome-button-in-chrome').attr('id', 'import-from-chrome-button-in-chrome-xtn');
    $('#import-from-chrome-button-in-chrome-xtn').on('click', function() {
      import_chrome('bookmarks');
    });
  });
}

// Overriding the login/register button so that when user clicks login/register
// it does not go to https://papaly.com/login but loads the login page using
// javascript and replace the newtab with it.
function register_inpage_href() {
  $('a.login-button, a.register-button').click(function(event) {
    event.preventDefault();
    block_app();
    redirect_location(this.href);
  });
}

// Master import, the same as content_import, please update both sides
// at the same time
function import_chrome(type) {
  block_app();
  var board_id = $('.board:visible').attr('board-id') || '-1';
  chrome.runtime.sendMessage({
    messageId: 'importChrome',
    board_id: board_id,
    type: type
  }, function(response) {
    $.ajax({
      url: '/dialog/import_preview',
      type: 'POST',
      data: response,
      success: function(data) {
        release_block();
        var recieved = $(data);
        // var preview_board = recieved.find('#import-preview-section-new');
        // layoutBoard(preview_board, 82, 30);
        load_dialog_success(recieved);
      },
      error: function() {
        release_block();
        show_flash_notice('Unable to upload bookmarks', 'error');
      }
    });
  });
}

// Logout needs to call background logout to take care of the tokens and the
// storage
logout = function() {
  chrome.extension.getBackgroundPage().logout();
};

////////////////////////////////////////////////////////////////////////////////
// Most functions are here because of the multiple binding problems for the
// login/register/etc forms. Chrome does not like inline javascripts and refuses
// to load some javascript from time to time. And Chrome does not like
// synchronous calls. Hence we put the dialog related stuff here.
// TODO: get rid of this section after our login/register dialog design
// stablizes.
/**
 * This part includes all login related overrides
 * Reason for overriding: We do prefer to use native form calls when possible
 * as it's simple and straighforward. However, it doesn't fit for chrome
 * extension because
 * 1. We do not want the regular redirect behavior of form.submit that will
 *    force it to leave newtab
 * 2. Some special handling necessary for things like guest form data.
 */
// Takes care of all login-related forms
// Called on registration/login pages and dialogs

// Add data for apps and history
function guest_login_get_data(form) {
  // Deprecated: The email/password part does appear in ui anymore
  var email = form.find('input#user_email').val();
  var token = form.find('input[name="authenticity_token"]').val();
  var password = form.find('input#user_password').val();
  var password_confirmation = form.find('input#user_password_confirmation').val();
  email = email ? email.trim() : '';
  token = token ? token.trim() : '';
  password = password ? password.trim() : '';
  password_confirmation = password_confirmation ? password_confirmation.trim() : '';

  return {
    authenticity_token: token,
    email: email,
    user: {
      email: email,
      password: password,
      password_confirmation: password_confirmation
    },
    chromeapp_json: chrome.extension.getBackgroundPage().get_chrome_app_json()
  };
}

// End of login related codes. /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// // For the old UI
// // This function for handling recent: browser specific
// function select_recent_pull_recent_from_browser() {
//   var card = $('#recently-visited-browser-history');
//   var item = card.find('.item-bookmark').detach();
//   var children = chrome.extension.getBackgroundPage().background_suggestions_chrome_history.children;
//   for(var i = 0; i < children.length; i++) {
//     var site = children[i];
//     var new_item = item.clone();
//     new_item.attr('url', site.url);
//     new_item.attr('tooltip', '<b>'+site.title+'</b><br/>'+site.url);
//     new_item.find('.item-icon').css('background-image', 'url(chrome://favicon/size/16@1x/' + site.url+')');
//     new_item.find('.item-icon').css('background-size', '16px');
//     new_item.find('.item-name').text(site.title);
//     new_item.find('.keywords').attr('name', site.title);
//     new_item.find('.keywords').attr('url', site.url);
//     new_item.find('.keywords').text(site.title);
//     new_item.insertBefore(card.find('.container-bottom'));
//   }
//   card.find('.item-container').show();
//   card.find('.recently-visited-install-message').remove();

//   var card = $('#recently-visited-browser-apps');
//   var item = card.find('.item-bookmark').detach();
//   var children = chrome.extension.getBackgroundPage().background_suggestions_chrome_apps.children;
//   for(var i = 0; i < children.length; i++) {
//     var site = children[i];
//     var new_item = item.clone();
//     new_item.attr('url', site.url);
//     new_item.attr('tooltip', '<b>'+site.title+'</b><br/>'+site.url);
//     new_item.find('.item-icon').css('background-image', 'url(' + site.iconUrl+')');
//     new_item.find('.item-icon').css('background-size', '16px');
//     new_item.find('.item-name').text(site.title);
//     new_item.find('.keywords').attr('name', site.title);
//     new_item.find('.keywords').attr('url', site.url);
//     new_item.find('.keywords').text(site.title);
//     new_item.insertBefore(card.find('.container-bottom'));
//   }
//   card.find('.item-container').show();
//   card.find('.recently-visited-install-message').remove();

//   // chrome.extension.getBackgroundPage().background_suggestions_chrome_history;
//   // chrome.extension.getBackgroundPage().background_suggestions_chrome_apps;
// }

// Our users want their recent to be Papaly recent + Chrome recent. Here's how
// we make it happen.
function xtn_fix_inbox_recent() {
  // Hide Install xtn message
  $('.inbox-xtn-message').hide();
  // Most visited and recently visited from Browser
  populate_recent_from_browser_cards();
}

// Callback for Chrome extension to inject into Papaly.com the recently visited
// from Chrome.
// Used by the new main UI
// Called whenever Inbox and Recent is selected
function populate_recent_from_browser_cards() {
  /* 'The Inbox and Recent' boards contains dummy cards. This function adds
  items to those cards and removes the Add Extension message */
  var card = $('#recently-visited-browser-history');
  var item = card.find('.item-bookmark').detach();
  var item_container = card.find('.item-container');
  var children = chrome.extension.getBackgroundPage().background_suggestions_chrome_history.children;
  // Number items to show in Most Visited From Browser History can be set here
  children = children.slice(0, 10);
  for (var i = 0; i < children.length; i++) {
    var site = children[i];
    var new_item = item.clone();
    new_item.find('a').attr('href', site.url);
    new_item.attr('tooltip', '<b>' + site.title + '</b><br/>' + site.url);
    new_item.find('.item-icon').css('background-image', 'url(chrome://favicon/size/16@1x/' + site.url + ')');
    new_item.find('.item-icon').css('background-size', '16px');
    new_item.find('.item-name').text(site.title);
    new_item.find('.keywords').attr('name', site.title);
    new_item.find('.keywords').attr('url', site.url);
    new_item.find('.keywords').text(site.title);
    item_container.append(new_item);
  }
  card.find('.item-container').show();
  card.find('.recently-visited-install-message').remove();


  chrome.extension.getBackgroundPage().get_suggestion_from_recent_history(function(chrome_recent_history_json) {
    var card = $('#recently-visited-browser-recent-history');
    var item = card.find('.item-bookmark').detach();
    var item_container = card.find('.item-container');
    var children = chrome_recent_history_json.children;
    for (var i = 0; i < children.length; i++) {
      var site = children[i];
      if (site.title == '') {
        // Not all Chrome history objects have a title
        site.title = site.url;
      }
      var new_item = item.clone();
      new_item.find('a').attr('href', site.url);
      new_item.attr('tooltip', '<b>' + site.title + '</b><br/>' + site.url);
      new_item.find('.item-icon').css('background-image', 'url(chrome://favicon/size/16@1x/' + site.url + ')');
      new_item.find('.item-icon').css('background-size', '16px');
      new_item.find('.item-name').text(site.title);
      new_item.find('.keywords').attr('name', site.title);
      new_item.find('.keywords').attr('url', site.url);
      new_item.find('.keywords').text(site.title);
      item_container.append(new_item);
    }
    card.find('.item-container').show();
    card.find('.recently-visited-install-message').remove();
  });
}

// This is the function that checks whether the server had a major overhaul.
// If there's one, this triggers the papaly extension to reload itself (not
// Chrome) through chrome.runtime.reload() because when server has big changes
// There's no way for the extension to continue functioning.
// the reload_papaly_chrome uses chrome.runtime.reload which is very slow
// should only be used for extreme conditions. Reload means an extension reload.
// Notice this is the cleanest reload. It essentially equivalent to turning off
// the extension and turning it back on.
function check_and_reload_papaly(version) {
  send_http_request_async(HOST_HTTPS + '/api/version?source=xtn-chrome&_=' + (new Date()).getTime(), function(responseText) {
    if (responseText != null) {
      new_version = JSON.parse(responseText).data.papaly_version_server;
      if (new_version != (version || PAPALY_VERSION_SERVER)) {
        PAPALY_VERSION_SERVER = version;
        console.log('Version discrepancy reload now: old: ' + PAPALY_VERSION_SERVER + ' new: ' + new_version);
        ((typeof block_app) == 'function') && block_app();
        chrome.runtime.reload();
      }
    }
  });
}

// With the override of check_and_reload_papaly. We are therefore only using
// reload_papaly for refresh_button. We want it to be simple and mild hence
// it should call redirect_location.
function reload_papaly(reload_extension) {
  ((typeof block_app) == 'function') && block_app();
  redirect_location('/');
}


// Chrome.tabs can open chrome:// and chrome-extension urls that some of our
// users loves to keep.
function open_url(url, in_current_tab) {
  // Handle it regularly if http/https
  if (url.match(/^https?:\/\//)) {
    // default in new tab
    if (in_current_tab) {
      window.location.href = url;
    } else {
      window.open(url);
    }
  } else {
    // default in new tab
    if (in_current_tab) {
      // This is stronger than window.location.href redirection
      // First we get this tab. This avoids user opening two newtabs and
      // click in one tab triggers open in another tab.
      chrome.tabs.getCurrent(function(tab) {
        // Then we force redirection inside it.
        chrome.tabs.update(tab && tab.id, {url: url}); // Force redirection
      });
    } else {
      chrome.tabs.create({url: url, active: true}); // here always active
    }
  }
  // Always a success for chrome extension as it does not check for popup
  // blocker.
  return true;
}

////////////////////////////////////////////////////////////////////////////////
// Functions related to login with Facebook ////////////////////////////////////
// Chrome extension works a bit differently, as the window.opener relation
// doesn't always work.

// it opens a new tab with Facebook authentications. And the code here deals
// with the case when successful logged in. And also deals with the case when
// user just simply closes the popup Facebook login page.
function papaly_app_authentication(provider, callback_success, callback_failure, data) {
  data = data || {};
  var query_string = "";
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (!query_string.length) {
        query_string = "?" + key + '=' + data[key];
      } else {
        query_string = query_string + "&" + key + '=' + data[key];
      }
    }
  }
  // If no provider or wrong provider
  if (!provider || provider == 'email') {
    return;
  }
  // Save the callback function to current window's context, the new window's papaly_app_authentication_through will call those two
  PAPALY_APP_AUTHENTICATION_CALLBACK_SUCCESS = (typeof callback_success !== 'undefined') ? callback_success : papaly_app_authentication_success;
  PAPALY_APP_AUTHENTICATION_CALLBACK_FAILURE = (typeof callback_failure !== 'undefined') ? callback_failure : papaly_app_authentication_failure;

  // open the new window and wait for authentication. maybe we want to block
  var url = HOST_HTTPS + '/auth/' + provider + query_string;
  // console.log(url);

  // Now create the window
  chrome.tabs.create({url: url, active: true}, function(tab) {
    PAPALY_APP_AUTHENTICATION_WINDOW = tab;
    setTimeout(papaly_app_authentication_check, 1000);
  });
}

/**
 * This function keeps checking the window to deal with the case when the user simply
 * closes the popup. It will call failure callback immediately.
 */
function papaly_app_authentication_check() {
  // For chrome, the tab we have is not the tab that's out there, when the tab is redirected a new tab is created, so we need to query again.
  chrome.tabs.get(PAPALY_APP_AUTHENTICATION_WINDOW.id, function(tab) {
    PAPALY_APP_AUTHENTICATION_WINDOW = tab;

    // Check if auth window still alive
    if (PAPALY_APP_AUTHENTICATION_WINDOW == undefined) {
      // for chrome, there's no closed() function, when the tab is gone, the get call will return undefined
      PAPALY_APP_AUTHENTICATION_CALLBACK_FAILURE();
    } else {
      // For chrome, cross-domain makes the code in the newpage worthless, parent needs to deal with the situation
      if (PAPALY_APP_AUTHENTICATION_WINDOW.url.match(/authentications\/success/)) {
        console.debug(PAPALY_APP_AUTHENTICATION_WINDOW.url.toString());
        // Parse out not_user_account from url
        var not_user_account = PAPALY_APP_AUTHENTICATION_WINDOW.url.match(/not_user_account=true/);
        PAPALY_APP_AUTHENTICATION_CALLBACK_SUCCESS('/', not_user_account);

        // Remove the authentication tab
        chrome.tabs.remove(PAPALY_APP_AUTHENTICATION_WINDOW.id);
        // Switch back to this newtab
        chrome.tabs.getCurrent(function(tab) {chrome.tabs.update(tab.id, {selected: true});});
        PAPALY_APP_AUTHENTICATION_WINDOW = undefined;
      } else {
        // Still very much alive, user is probably still working on it
        setTimeout(papaly_app_authentication_check, 500);
        console.log('Still no response, wait for another 1s');
      }
    }
  });
}

/**
 * add ajax prefilter so that any call to the location "/something" is sent to our server instead of chrome://hashcodehere
 * and the data is decorated with "source" to indicate that it comes from the extension
 */
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
  // console.log(new Date().toISOString() + ': ' + 'prefilter called with data: ' + options.data);
  if (options.data == undefined) {
  } else if (options.data == '') {
    options.data = 'source=xtn-chrome';
  } else if (options.data instanceof FormData) {
    options.data.append('source', 'xtn-chrome');
  } else if (!options.data.match(/xtn-chrome/)) {
    options.data = 'source=xtn-chrome&' + options.data;
  }
  // Here if we are making a request to /something, we redirect it to papaly
  // And now the request is truly crossDomain.
  if (options.url.charAt(0) == '/') {
    options.url = HOST_HTTPS + options.url;
    options.crossDomain = true;
  }
});

// The ajax calls we do here get a bunch of HTML contents with things like
// image src="/test.png". Without mapping to absolute url, the all got converted
// into chrome-extension://extensionhash/test.png which does not display
// correctly. We filter the HTML and fix the relative path, for newtab.
$.ajaxSetup({
  dataFilter: function(data, type) {
    return mapHtml(data);
  }
});

// We need some special dynamic css, hence create divs and add them here
function add_chrome_xtn_styles() {
  // if (chrome.extension.getBackgroundPage().papaly_search_start < new Date().getTime()) {
  //   $('#right-panel').addClass('papaly_search_enabled');
  // } else {
  //   $('#right-panel').removeClass('papaly_search_enabled');
  // }
}

// When user switches between two newtabs and holding their mouse down
// the mousedown happens in one tab and the mouse up happens in another page.
// This breaks many of our javascripts. This cleanup function will fix them all.
function cleanup_drag_and_drop_temp_states() {
  // Remove temporary nodes: remove some helper node and class, remove placeholders, show hidden elements
  // Cleanup bookmark drag and drop
  $('.bookmark-placeholder').remove();
  $('.item-bookmark.ui-sortable-helper').remove(); // helper was a clone rather than the original
  $('#main').removeClass('drag-initiated-item');
  // Cleanup category drag and drop
  // The card's helper is the original rather than a clone. So Remove class and style rather than helper element
  $('.category-placeholder').remove();
  $('.card.ui-sortable-helper').removeClass('ui-sortable-helper').removeAttr('style');
  $('#main').removeClass('drag-initiated-card');
  // Cleanup dragging shortcut
  $('.shortcut-module.ui-sortable-helper').remove(); // helper: 'clone'
  $('#main').removeClass('drag-initiated-shortcut');
  // Remove over-trash class that gets added when hovering over class
  $('.over-trash').removeClass('over-trash');
  // Show the original HTML that gets hidden while dragging
  $('.board:visible').find('.card:hidden, .item-bookmark:hidden').show();
  update_board_excess_links($('.board:visible').find('.card')); // Fix hide extra links
  $('#inbox-section').find('.item-bookmark:hidden').show();
  $('#speed-dial-section').find('.shortcut-module:hidden').show();
  // Cleanup Left Sidebar state when dragging item/category
  $('.nav-section-item.drop-hover').removeClass('drop-hover');
  $('.card.transparent-card').removeClass('transparent-card');
  // Cleanup drag and drop re-order boards
  $('.nav-section-item.ui-sortable-helper').removeClass('ui-sortable-helper').removeAttr('style');

  $('#float-container').find('.ui-sortable-helper').remove();
  $('.tab-placeholder').remove();
  // Hide notice
  try_call('hide_tooltip');
  // Hide notice
  try_call('hide_flash_notice');
  $('#rand-notice').attr('state', '1');
}

// Make GA compatible with the xtn
ga('set', 'checkProtocolTask', function() {});

function query_string_to_JSON(str) {
  var pairs = str.split('&');
  var result = {};
  pairs.forEach(function(pair) {
    pair = pair.split('=');
    var name = unescape(pair[0]);
    var value = unescape(pair[1]);
    if (name.length)
      if (result[name] !== undefined) {
        if (!result[name].push) {
          result[name] = [result[name]];
        }
        result[name].push(value || '');
      } else {
        result[name] = value || '';
      }
  });
  return result;
}

// Keeps our popup in sync when user edits w/ extension
// Should not be re-registered when switching tabs back
register_timestamp_listener();

function register_timestamp_listener() {
  $(document).ajaxSuccess(global_on_ajax_success);
}

// Intercepts all ajax calls on our new tab so we can keep background page up to date
// Notices certain ajax calls and renews the timestamp on their corresponding boards
// This way popup's sort_by_recent on boards can use updated values
function global_on_ajax_success(event, xhr, settings) {
  var data = settings.data && query_string_to_JSON(settings.data);
  var route = settings.url.match(/https?:\/\/[^\/]*\/(.*)/i)[1];
  var type = settings.type;
  var timestamp = xhr.getResponseHeader('date');
  var response = xhr.responseJSON;

  var bg = chrome.extension.getBackgroundPage();

  // What we update depends on route, type, and data params
  // Delete routes for items and categories need to use response text
  // since the items/categories are already gone
  if (route.match(/^items\/?/i)) {
    if (route.match(/^items$/i)) {
      if (type.match(/POST/i)) {
        bg.renew_timestamp_by_category(data['item[category_index]'], timestamp);
      } else if (type.match(/PUT/i)) {
        bg.renew_timestamp_by_item(data['item[index]'], timestamp);
      } else if (type.match(/DELETE/i)) {
        response.board_ids.forEach(function(board_id) {
          bg.renew_timestamp_by_board(board_id, timestamp);
        });
      }
    } else if (route.match(/^items\/move$/i)) {
      if (type.match(/PUT/i)) {
        bg.renew_timestamp_by_category(data['to_category'], timestamp);
      }
    }
  } else if (route.match(/^categories\/?/i)) {
    if (route.match(/^categories$/i)) {
      if (type.match(/POST/i)) {
        bg.renew_timestamp_by_board(data['board_id'], timestamp);
      } else if (type.match(/PUT/i)) {
        bg.renew_timestamp_by_category(data['category[index]'], timestamp);
      } else if (type.match(/DELETE/i)) {
        response.board_ids.forEach(function(board_id) {
          bg.renew_timestamp_by_board(board_id, timestamp);
        });
      }
    } else if (route.match(/^categories\/move$/i)) {
      if (type.match(/PUT/i)) {
        bg.renew_timestamp_by_board(data['to_board_id'], timestamp);
      }
    }
  } else if (route.match(/^boards\/?/i)) {
    if (route.match(/^boards$/i)) {
      if (type.match(/POST/i)) {
        // Defaults to current board
        bg.renew_timestamp_by_board(null, timestamp);
      } else if (type.match(/PUT/i)) {
        bg.renew_timestamp_by_board(data['board_id'], timestamp);
      } else if (type.match(/DELETE/i)) {
        // Already gone
      }
    } else if (route.match(/^boards\/move$/i)) {
      if (type.match(/PUT/i)) {
        bg.renew_timestamp_by_board(data['board_id'], timestamp);
      }
    }
  } else if (route.match(/^users$/i)) {
    if (type.match(/PUT/i)) {
      var theme = data['user[theme]'];
      if (theme) {
        bg.theme = theme;
      }
    }
  }
}
