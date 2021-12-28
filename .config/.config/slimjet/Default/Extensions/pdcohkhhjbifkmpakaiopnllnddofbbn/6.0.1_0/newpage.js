// This javascript contains the callback that would allow an outdated newtab
// to synchronize with the server.

// Upon new newtab start, nothing is loaded yet. It shows the default
// "Loading ..." message.
var NEWPAGE_LOADED = false;

// This function is the active page replacement callback to synchronize between
// multiple newtabs. The from_self is only true for the call at the end of this
// javascript. In the case of a new newtab, newtab_loadhomepage would attempt
// to load an up to date newtab. And the subsequent reload is ignored.
// TODO: rename this and simplify some logic.
// TODO: some logic here are overlapping with newpage_loadhomepage. We should
//       try to combine both.
function loadhomepage6(from_self) {
  // console.log(new Date().toISOString() + ": " + "loadhomepage6 called");

  // Takes care of the current board selection, this allow the different newtabs
  // to have different focus.
  var original_search_value = $('#master-search').val() || ''; // In some cases we want to display the old input value
  var original_board_id = $('.nav-tab.selected[board-id]').attr('board-id');

  // skip if background is not ready
  if (!chrome.extension.getBackgroundPage().BACKGROUND_READY) {
    console.log(new Date().toISOString() + ': ' + 'loadhomepage6: background not ready just wait');
    return;
  }

  // If not a new newtab, we will need to sync the HTML
  if (from_self == undefined) {
    NEWPAGE_LOADED = false;
  }

  // Decide what to load as the newtab
  var return_result = 'not sure';
  var homepage_to_load = undefined;
  if (NEWPAGE_LOADED) {
    // For new newtab, there's no need to sync.
    // console.log(new Date().toISOString() + ": " + "homepage already loaded go to binding directly");
    return_result = 'homepage already loaded go to binding directly';
  } else if (document == chrome.extension.getBackgroundPage().DOC && check_page_valid(document.body.innerHTML)) {
    // If the last newtab is just this tab, we don't need to do anything.
    // console.log(new Date().toISOString() + ": " + "skip reloading if last document is just self, also skip binding");
    switched_back_to_last_newtab();
    return_result = 'skip reloading due to last document';
    // Return immediately without binding or registerasnewtab, not necessary.
    return return_result;
  } else if (chrome.extension.getBackgroundPage().HOMEPAGE_LOADED) {
    // In case if user is signed in, load the last newtab. And do some sanity
    // check on the page
    homepage_to_load = chrome.extension.getBackgroundPage().cloneHomePage();
    console.log(new Date().toISOString() + ': ' + 'homepage body replaced with homepage');
    NEWPAGE_LOADED = true;
    return_result = 'homepage body replaced with homepage';
  } else if (chrome.extension.getBackgroundPage().LOGGED_IN === false) {
    // Show logged in page only when it's clear user does not have a good
    // session. Notice here if LOGGED_IN === undefined, then background is not
    // fully ready yet (It hasn't finished handshake with server yet).
    homepage_to_load = chrome.extension.getBackgroundPage().cloneLoginPage();
    console.log(new Date().toISOString() + ': ' + 'homepage body replaced with login page');
    NEWPAGE_LOADED = true;
    return_result = 'homepage body replaced with loginpage';
  } else {
    // Nothing is ready. Just show the "Loading ..." message.
    console.log(new Date().toISOString() + ': ' + 'neither homepage nor login page ready wait');
    NEWPAGE_LOADED = false;
    return_result = 'neither homepage nor login page ready wait';
    // wait and wait
  }

  // NEWPAGE_LOADED means we have something to load
  if (NEWPAGE_LOADED) {
    // Check the version for reload
    PAPALY_VERSION_SERVER = chrome.extension.getBackgroundPage().get_papaly_version();
    // Prepare to replace page
    console.log(new Date().toISOString() + ': ' + 'check page valid');
    if (check_page_valid(homepage_to_load)) {
      // Update theme
      chrome.extension.getBackgroundPage().update_theme(document);
      // #0. homepage_to_load is a string.
      document.body.innerHTML = homepage_to_load;

      // #1. keep the keywords in search box
      $('#master-search').attr('value', original_search_value);

      // #2. keep the current board selected. (not apps for now)
      if (original_board_id) {
        $('.nav-tab.selected').removeClass('selected');
        $('.nav-tab[board-id="' + original_board_id + '"]').addClass('selected');
        $('.board').hide();
        $('.board[board-id="' + original_board_id + '"]').show();
        $('#main').attr('show', 'boards');
        $('.app-tab.selected').removeClass('selected');
      }
      console.log(new Date().toISOString() + ': ' + 'finish settimeout for replacing the page');
      // #3. Now go ahead and bind it
      // Here 200 instead of 0 as a small number seems to compete with the page
      // itself causing it to delay.
      setTimeout(bind_all_listeners, 200);
      console.log(new Date().toISOString() + ': ' + 'finish bind all listeners the page');
    }
  } else {
    console.log(new Date().toISOString() + ': ' + 'newpage not loaded at the end of loadhomepage6, wait for interval job');
  }

  // Regardless of what we loaded or not loaded so far, we are a valid newtab
  // at this moment, the background page should be smart enough to judge
  // whether it wants to use this page as a source of cloneHomepage.
  console.log(new Date().toISOString() + ': ' + 'registered as newtab');
  register_as_newtab();

  return return_result;
}

// Define the bind function at run time.
function bind_all_listeners() {
  // Now bind everything
  console.log(new Date().toISOString() + ': ' + 'newpage loaded at the end of loadhomepage6, now bind everything');
  // Now register listeners, do the chore, and everything.
  register_all_listeners();
  set_ga_user_id();
  ga('send', 'pageview', '/xtn-chrome/newtab');
  chrome_newpage_special();
  run_all_delayed_jobs();
  console.log(new Date().toISOString() + ': ' + 'homepage listener added');
  // Run all jobs like show_walk_through, show_tod, show_rand_notice
  run_all_once_jobs(0.2, {});
}

// This notifies the backgroundpage that this tab is the latest newtab and
// in case if users have multiple newtabs, this tab should be the reference.
// Check background_newtab for what background page does to provide best
// support for the sync.
function register_as_newtab() {
  console.log(new Date().toISOString() + ': ' + 'registering as newtab');
  // Here we do not use chrome.tabs.query as we want to know this tab, instead
  // of the active tab. Even if user switches, this is still the right tab.
  chrome.tabs.getCurrent(function(tab) {
    console.log(new Date().toISOString() + ': ' + 'registering as newtab got tab id: ' + tab.id);
    chrome.extension.getBackgroundPage().registerTabAsNewTab(tab, loadhomepage6, document);
  });
}

// Some work that needs to be done if last newtab
function switched_back_to_last_newtab() {
  var new_cards = $('#boards-container').find('.card:visible')
    .find('ol:not(.ui-sortable)').closest('.card');
  new_cards.each(function(card) {
    register_newcard_listeners(card);
  });
}

console.log(new Date().toISOString() + ': ' + 'end of time in newpage newpage.js');
