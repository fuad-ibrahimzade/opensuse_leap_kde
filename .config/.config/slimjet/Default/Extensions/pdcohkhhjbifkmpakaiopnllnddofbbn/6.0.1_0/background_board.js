// This file takes care of the interaction between the browser action popup
// and the background page. The browser popup will get the list of available
// places to save the current page from this javascript. And when the
// communication with the server is done, these API will take care of the
// update of background page so that background always have the correct
// copy of everything.

// Searching background page to see if a page is saved in Papaly
function get_item_by_url(url, inbox_only) {
  if (!url || !DOC) {
    return undefined;
  }
  // Strip out the http and the ending slash for both url and the
  // matching item url
  // Chrome's version always have http and ending slash
  url = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  // Now find the item
  if (inbox_only) {
    return url_search(DOC.getElementById('inbox-section')
      .querySelectorAll('.item-bookmark'), url);
  } else {
    var item = url_search(DOC.querySelectorAll('.item-bookmark, .shortcut-module'), url);
    if (!item && DOC != document) {
      item = url_search(document.getElementById('backgroundboards')
             .querySelectorAll('.item-bookmark, .shortcut-module'), url);
    }
    return item;
  }
}

function url_search(items, url) {
  for (var i = 0; i < items.length; i++) {
    var ahref = items[i].querySelector('a[href]');
    var u = ahref && ahref.href.replace(/^https?:\/\//, '').replace(/\/$/, '');
    if (u == url) {
      return items[i];
    }
  }
}

// Init a jQuery item object from a string
function init_item(item) {
  if (!item) return $('');
  if (item instanceof jQuery) return item;
  // Skip if unwanted string
  if (!item.match(/item-bookmark|shortcut-module/)) return $('');
  // It is a string, let's wrap it up
  item = item.trim();
  item = mapHtml(item);
  item = $(item);
  item.register_item_listeners();
  return item;
}

// This override is copied over newpage_fix.js
// Since we sometimes register item here in the init_item, those got bind
// to the open_url inside background page. Hence we need to override it in
// the same way as in newpage.html
function open_url(url, in_current_tab) {
  // default in new tab
  if (in_current_tab) {
    // This is stronger than window.location.href redirection
    chrome.tabs.update({url: url}); // Force redirection
  } else {
    chrome.tabs.create({url: url, active: true}); // here always active
  }
}

// function add the item to backgrounds
// Decorate item with timestamp if necessary
function add_item_to_docs(item, dest_category_id, timestamp) {
  item = init_item(item);
  // Cleanup to avoid potential duplicates for some unknown reason
  var item_id = item.attr('item-index');
  var items = find_item_by_id(item_id).remove();
  // Now insert
  var category = find_category_by_id(dest_category_id);
  category.prepend(item);
  renew_timestamp_by_category(dest_category_id, timestamp);
  return item;
}

// function update the item to backgrounds, takes the text as input
function update_item_to_docs(item, timestamp) {
  item = init_item(item);
  // Insert to the target category or inbox
  var item_id = item.attr('item-index');
  var items = find_item_by_id(item_id);
  if (items.size() > 0) {
    items.replaceWith(item);
    renew_timestamp_by_item(items, timestamp);
  } else {
    item = add_item_to_docs(item, null, timestamp);
  }
  return item;
}

// Move an item to a particular category
function move_item(item_id, dest_category_id, item_data, timestamp, callback) {
  find_item_by_id(item_id).detach();
  find_category_by_id(dest_category_id).prepend(init_item(item_data));
  renew_timestamp_by_category(dest_category_id, timestamp);
  callback();
}

// function remove item from background
function remove_item_from_docs(item_id, timestamp) {
  if (!DOC || !item_id) {
    return;
  }
  var items = find_item_by_id(item_id);
  if (items.length) {
    renew_timestamp_by_item(items, timestamp);
    items.remove();
  }
}

// function add the card to backgrounds
// Attach card to a board or first displayed board
function add_card_to_docs(card, board_id, timestamp) {
  if (!DOC || !card) {
    return;
  }
  card = $(card);
  // Add to particular board, otherwise add to displayed board
  var board = find_board_by_id(board_id);
  // Hide empty overlay if board was empty
  board.find('.empty-board-overlay, .command-import-bookmarks').hide();

  var slot = board.find('.category-slot').first();
  slot.prepend($(card));
  renew_timestamp_by_board(board_id, timestamp);
  return card;
}

// For browser action popup to get the inbox id in the case when use choose
// to move the bookmark to inbox then we have an id to work with.
function get_link_bar_ids(callback) {
  var inbox_id = $(DOC).find('#inbox-section').attr('category-index');
  var speed_dial_id = $(DOC).find('#speed-dial-section').attr('category-index');
  callback({ inbox_id, speed_dial_id });
}

// For browser action popup to get the board list
function get_boards() {
  console.log('get_boards() entered');
  var boards = (DOC).getElementById('nav-your-boards')
    .getElementsByClassName('nav-section-item');
  return boards;
}

// In case when the item exists in our system, we show it's name and where
// it is. And in the case when the user wants to edit or move the item
// we have an id to work with.
function get_item_location(item_id, callback) {
  // Return which board and category (possibly Inbox / Speed Dial) the item is in
  // Values to return
  var category_id;
  var category_name;
  var board_id;
  var board_name;

  var $DOC = $(DOC);

  // First check if the item ID exists in the inbox
  var inbox = $DOC.find('#inbox-section');
  var inbox_items = inbox.find('.item-bookmark');
  var inbox_item = inbox_items.filter('[item-index="' + item_id + '"]');
  if (inbox_item.length) {
    // We are in the inbox
    category_id = inbox.attr('category-index');
    category_name = 'Inbox';
    board_id = '';
    board_name = '';
    callback(category_id, category_name, board_id, board_name);
    return;
  }

  // Then check if the item ID exists in the speed dial
  var speed_dial = $DOC.find('#speed-dial-section');
  var speed_dial_shortcuts = speed_dial.find('.shortcut-module');
  var speed_dial_shortcut = speed_dial_shortcuts.filter('[item-index="' + item_id + '"]');
  if (speed_dial_shortcut.length) {
    // We are in the speed dial
    category_id = speed_dial.attr('category-index');
    category_name = 'Speed Dial';
    board_id = '';
    board_name = '';
    callback(category_id, category_name, board_id, board_name);
    return;
  }

  // Finally check if the item ID exists in any of the boards
  var boards = $DOC.find('.board');
  var board_items = boards.find('.item-bookmark');
  var board_item = board_items.filter('[item-index="' + item_id + '"]');
  if (board_item.length) {
    board_item = board_item.first();
    var category = board_item.closest('.card');
    var board = category.closest('.board');
    category_id = category.attr('category-index');
    category_name = category.attr('category-name');
    board_id = board.attr('board-id');
    board_name = board.attr('board-name');


    callback(category_id, category_name, board_id, board_name);
    return;
  }

  // We were unable to find the item
  console.log('Unable to get item location');
  callback(category_id, category_name, board_id, board_name);
  return;
}

function set_current_board(board_id, callback) {
  // confirm that we have a board_id and that we have that board
  var jQueryDoc = $(DOC);
  if (board_id && jQueryDoc.find('#sidebar-nav .nav-section-item[board-id="' + board_id + '"]')) {
    jQueryDoc.find('#main')
      .attr('board-state', 'board')
      .attr('current-board-id', board_id);
    jQueryDoc.find('.board').css('display', 'none');
    jQueryDoc.find('.board[board-id="' + board_id + '"]').css('display', 'block');
    jQueryDoc.find('.nav-section-item').removeClass('nav-item-selected');
    jQueryDoc.find('.nav-section-item[board-id="' + board_id + '"]').addClass('nav-item-selected');
  }
  // Call the callback to open a newtab page
  callback();
}

function find_item_by_id(item_id) {
  return $(DOC).find('.item-bookmark, .shortcut-module').filter('[item-index="' + item_id + '"]');
}

// Searches cards and then speed dial, defaulting to inbox
function find_category_by_id(category_id) {
  var category = $(DOC)
      .find('.card[category-index="' + category_id + '"]')
      .find('.item-container');
  if (category.length) {
    return category;
  }

  var speed_dial = $(DOC)
      .find('#speed-dial-section[category-index="' + category_id + '"]')
      .find('.ui-sortable');
  if (speed_dial.length) {
    return speed_dial;
  }

  return $(DOC).find('#inbox-section').find('.item-container');
}

// Defaults to current board
function find_board_by_id(board_id) {
  var board = $(DOC).find('.board[board-id="' + board_id + '"]');
  return board.length ? board : $(DOC).find('.board:visible');
}

function renew_timestamp_by_item(item, timestamp) {
  if (typeof item == 'string') {
    item = find_item_by_id(item);
  }
  renew_timestamp_by_board(item.closest('.board').attr('board-id'), timestamp);
}

function renew_timestamp_by_category(category_id, timestamp) {
  if (!category_id || !timestamp) return;
  $(DOC).find('.nav-item-category[category-index="' + category_id + '"]')
    .closest('.nav-section-item').attr('board-last-update', timestamp);
}

function renew_timestamp_by_board(board_id, timestamp) {
  if (!board_id || !timestamp) return;
  $(DOC).find('.nav-section-item[board-id="' + board_id + '"]')
    .attr('board-last-update', timestamp);
}
