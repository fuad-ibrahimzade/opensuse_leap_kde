function initialize_search_results() {
  register_listeners();
  check_full();
}

function register_listeners(event) {
  $('#papaly-embedded-module')
    .on('click', '#papaly-expand', expand_module)
    .on('click', '#papaly-collapse', collapse_module)
    .on('click', '#close-module-button', hide_module)
    .on('click', '#disable-bookmarks', hide_forever)
  ;
}

function expand_module(event) {
  $('#papaly-embedded-module').addClass('expanded');
}

function collapse_module(event) {
  $('#papaly-embedded-module').removeClass('expanded');
}

// Hides the module for the session
function hide_module(event) {
  $('#papaly-embedded-module').addClass('module-removed');
  chrome.runtime.sendMessage({ messageId: 'toggleSearch', keyword: 'now' });
}

// Hides the module for a week initially, doubling thereafter
function hide_forever(event) {
  remove_papaly_node();
  chrome.runtime.sendMessage({ messageId: 'toggleSearch', keyword: 'ever' });
}

// Hides the toggle if there are no more links to display
function check_full() {
  // Computes the number of displayed elements by using width and math
  var speed_dial_visible_max = Math.max(Math.floor($('#speed-dial-section .inner-section').width() / ($('#speed-dial-section .inner-section .shortcut-module').width() - 1)), 0);
  // 4 rows for bookmarks
  var inbox_visible_max = 4 * Math.max(Math.floor($('#inbox-section .inner-section').width() / ($('#inbox-section .inner-section .item-bookmark').width() - 1)), 0);
  var speed_dial_excess_count = Math.max($('#speed-dial-section .inner-section .shortcut-module').length - speed_dial_visible_max, 0);
  var inbox_excess_count = Math.max($('#inbox-section .inner-section .item-bookmark').length - inbox_visible_max, 0);

  if (!speed_dial_excess_count && !inbox_excess_count) {
    // Hides if there is no excess
    $('#papaly-expand').hide();
  }
}
