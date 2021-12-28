var tab_id;
function init_newitem() {
  // Get the current tab's url and create the item
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    var tab = tabs[0];
    tab_id = tab.id;
    chrome.browserAction.setIcon({path: 'assets/added-19.png', tabId: tab.id});
    // Create the item
    var url = tab.url;
    var title = tab.title;
    var favIconUrl = tab.favIconUrl;

    // first locate the item
    var item = $(chrome.extension.getBackgroundPage().get_item_by_url(url));
    if (item.length) {
      // item exists
      ga('send', 'event', 'item', 'create', 'exist');
      $('#edit-title').val(item.find('.item-name').text());
      var note = item.find('.item-bookmark-note').text();
      if (note) {
        $('#add-note').text('Edit Note');
        $('#note-field').text(note).attr('data-old-note', note);
      }
      $('#window-container').attr('item-id', item.attr('item-index'));
      $('#window-container').attr('status', 'exists');
      store_item_location(show_item_location);

      // Now turn on transition, need the delay,
      // otherwise still see 0 => * transition
      setTimeout(function() {
        $('#window-container').removeClass('notransition');
      }, 500);
    } else {
      // immediately enter edit stage
      $('#edit-title').val(title);
      show_notice('Saved to <span id="saved-to-category">Inbox</span>');

      // enter_stage('edit');
      // Ajax function, everything in a hash
      chrome.extension.getBackgroundPage().create_item(tab,
          {'from' : 'chrome_extension_button'}, function(item) {
        var item = $(item);
        if (!item || item.size() === 0) {
          // Item failed to create for some reason
          chrome.tabs.create({url: chrome.extension.getURL('newpage.html')});
        } else {
          $('#window-container').attr('item-id', item.attr('item-index'));
          $(item).addClass('newly-created');
          store_item_location();
          // Now turn on transition
          $('#window-container').removeClass('notransition');
        }
      });
    }
    chrome.extension.getBackgroundPage().get_link_bar_ids(store_link_bar_ids);
    console.log(new Date().toISOString() + ': ajax sent');
  });
}

// Stores the category name/id, board id/name in #window-container
// View_item can then use the board_id
function store_item_location(callback) {
  var item_id = $('#window-container').attr('item-id');
  chrome.extension.getBackgroundPage().get_item_location(item_id,
    function(cat_id, cat_name, board_id, board_name) {
      var window_container = $('#window-container');
      window_container.attr('category-id', cat_id);
      window_container.attr('board-id', board_id);
      window_container.attr('category-name', cat_name);
      window_container.attr('board-name', board_name);

      if (callback) {
        callback(cat_name);
      }
  });
}

// Called when item already exists
function show_item_location(category_name) {
  if (category_name && category_name !== '') {
    show_notice('Exists in <span id="saved-to-category">' +
    category_name + '</span>');
    $('#selected-category-button').find('.text').text(category_name);
    $('#categorize-section').attr('state', '*');
    console.log('Link already saved in: ' + category_name);
  } else {
    // This code block should never be executed
    // if we correctly found the item
    show_notice('Link already saved.');
  }
}

function view_item() {
  // If we have a board id we want to show that particular board
  var board_id = $('#window-container').attr('board-id');
  if (board_id !== null && board_id !== '') {
    chrome.extension.getBackgroundPage().set_current_board(board_id, function() {
      // After current board is set, open newtab
      chrome.tabs.create({url: chrome.extension.getURL('newpage.html')});
    });
  }
  else {
    // Just open newtab, show whichever board
    chrome.tabs.create({url: chrome.extension.getURL('newpage.html')});
  }
}

function update_suggested_category() {
  $.ajax({
    type: 'GET',
    url: HOST_HTTPS + '/categories/suggested_category',
    cache: false,
    success: function(data) {
      var ajaxResponse = data;
      // The server sent us the name and uuid, so now we can show it
      var suggested_category_button = $('#suggested-category-button');
      var board_name = suggested_category_button.find('#suggested-board');
      board_name.attr('board-id', ajaxResponse.board_uuid);
      board_name.html(ajaxResponse.board_name);
      var category_name = suggested_category_button.find('#suggested-category');
      category_name.attr('category-id', ajaxResponse.uuid);
      category_name.html(ajaxResponse.name);
      suggested_category_button.show();
    }
  });
}

function update_boards_list() {
  var boards_dom = chrome.extension.getBackgroundPage().get_boards();
  var boards = $(boards_dom);
  // For each board create an element with the board name and board-id
  var board_name_container = $('#hidden-data #groups-container');
  board_name_container.find('.group-container').remove();

  // For each board in boards
  boards.each(function() {
    // The backbone
    var group_container_element = $('<div class="group-container"></div>');
    // The board name part
    var board_name = $(this).attr('board-name');
    var board_id = $(this).attr('board-id');
    var board_last_update = $(this).attr('board-last-update');
    var board_name_element = $('<div class="board-name text" board-id="' + board_id +
          '" board-last-update="' + board_last_update + '">' + board_name + '</div>');
    group_container_element.append(board_name_element);
    // The categories
    var categories_element = $('<div class="categories-list-container"></div>');
    var categories = $(this).find('.nav-item-category').map(function() {
      var category_name = $(this).text().trim();
      var category_id = $(this).attr('category-index');
      return '<div class="category"><div class="category-name text" category-id="' +
        category_id + '">' + category_name + '</div></div>';
    }).get();
    categories_element.html(categories);
    group_container_element.append(categories_element);
    // Add to the list
    board_name_container.append(group_container_element);
  });
}

// Callback after item_removed
function item_removed(item_id, timestamp) {
  chrome.extension.getBackgroundPage().remove_item_from_docs(item_id, timestamp);
  chrome.browserAction.setIcon({path: 'assets/add-19.png', tabId: tab_id});
}

// Callback after item note updated
function item_note_updated(item_html, timestamp) {
  chrome.extension.getBackgroundPage().update_item_to_docs(item_html, timestamp);
}

// Callback after item name updated
function item_name_updated(item_html, timestamp) {
  chrome.extension.getBackgroundPage().update_item_to_docs(item_html, timestamp);
}

// Callback for item moved
function item_moved(item_id, dest_category_id, item_data, timestamp) {
  chrome.extension.getBackgroundPage().move_item(item_id, dest_category_id,
    item_data, timestamp, store_item_location);
  update_boards_list();
  sort_by_current();
}

function category_created(category_html, board_id, timestamp) {
  chrome.extension.getBackgroundPage().add_card_to_docs(category_html, board_id, timestamp);
}

function store_link_bar_ids({ inbox_id, speed_dial_id }) {
  // Find the two inbox buttons and set the id for this user's inbox
  // One is in the list of boards
  // The other one is in the list of categories (so it can be searched)
  $('.inbox').attr('category-id', inbox_id);
  $('.speed-dial').attr('category-id', speed_dial_id);
}

// Hancle the case when the user lost credential
function handle_ajax_error(jqXHR, textStatus, errorThrown) {
  if (jqXHR.status == 404 || jqXHR.status == 401) {
    chrome.tabs.create({url: HOST_HTTPS});
  }
}

// Respond to window size change.
function window_size_changed() {
  // Nothing to be done for Chrome.
}
