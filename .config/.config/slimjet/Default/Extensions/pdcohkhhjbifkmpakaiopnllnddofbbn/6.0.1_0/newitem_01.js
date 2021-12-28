// prompt - light blue button
// list - option container
//
// States of #categorize-section
// 0. no category chosen / prompt = suggestion / list = collapsed
// 1. no cat / prompt = suggestion / list = expanded boards
// 2. no cat / prompt = board name / list = expanded cats
// 3_1/3_2. no cat / prompt = suggestion / list = filtered cats
// 4. no cat / prompt = new cat name / list = expanded boards
// *. cat chosen / prompt = cat name

// 0, 1, 2, 3 => * - click on suggestion
// 0 => 1 - click on #reveal boards button
// 1 => 2 - click .board-name / 2 => 1 - click prompt
// 1 => 3_1 - enter keywords
// 2 => 3_2 - enter keywords
// 2 => * - click .category-name
// 3 => * - click .category-name
// 3 => 4 - click #create-button
// 4 => * - click .board-name
// 4 => 1 - click #cancel-category-creation
// * => 1 - click the selected board/category name
$(document).ready(function() {
  register_click_listeners();
  register_xtn_events();

  // Initialize the item: web: nothing
  // chrome: init_newitem, firefox: init_newitem
  init_newitem();
  update_suggested_category();
  update_boards_list();
  sort_by_current();
  $('#window-container').on('transitionend', window_size_changed);
  setTimeout(function() { window_size_changed(); }, 250); //Animations are no longer than 250 ms so after 250ms the size should be its final size
});

var original_title = ''; // Used to check if title has been edited
var selected_board_id = '';
// Flag used to check if both a focus and click event have fired
var select_on_click = { note: false, title: false };

// Set default collapsed height
function register_xtn_events(e) {
  // Go to extension newpage when logo or 'view' is clicked
  $('#logo, #view-button').click(view_item);
  $('#header-notice').on('click', '#saved-to-category', view_item);
  $('#remove-button').click(remove_item);
  $('#add-note').click(add_note);
  $('#save-note').click(save_note);
  $('#note-field').on('change keydown keyup paste', note_character_counter);
  $('#note-field').on('focusout', save_note);

  // The goal is to select the entirety of the name or description on focus and click
  // to make it easier for the user to replace the field. We implement a hacky way that
  // selects if the click completes within a short interval of a focus.

  // On focus only, since focus happens before the click finishes completing, the
  // click proper will deselect the selection created on focus.
  $('#note-field').on('focusin', function(e) {
    $(this).next('#character-count').show();
    $(this).closest('#title-section').find('#save-note').show();
    select_on_click.note = true;
    setTimeout(function() { select_on_click.note = false; }, 1000);
  });
  // On click only, attempting to use the mouse to navigate between text will select
  // the text in its entirety every other click, causing a frustrating user experience.
  $('#note-field').on('click', function(e) {
    if (select_on_click.note) {
      $(this).select();
    }
    select_on_click.note = false;
  });

  // Related to editing the title
  $('#edit-title').focusin(function(e) {
    original_title = $(this).val().trim();
    select_on_click.title = true;
    setTimeout(function() { select_on_click.title = false; }, 1000);
  });
  $('#edit-title').click(function(e) {
    if (select_on_click.title) {
      $(this).select();
    }
    select_on_click.title = false;
  });
  // focusout or save_title does not get called when popup window is closed
  $('#edit-title').focusout(save_title);
  // Disable line break
  $('#edit-title').keydown(function(e) {
    if (e.which == 13) { // ENTER
      e.preventDefault();
      $('#edit-title').blur(); // calling blur triggers focusout save_title()
    }
  });

  // 0 => 1 - click on #reveal boards button
  $('#reveal-boards-button').click(show_menu_data);

  // * => 1 - click the selected board/category name
  // 2 => 1 - click prompt
  // $('#selected-board-button').click(goto_state1);
  $('#prompt-nav').click(goto_state1);
  $('#selected-category-button').click(goto_state1);

  // 0, 1, 2, 3 => * - click on suggestion
  $('#categorize-section')
  .on('click', '#suggested-category-button', suggested_clicked);

  // 1 => 2 - click .board-name
  $('#menu-data-container').on('click',
    '#menu-container[board-only="false"] .board-name',
    goto_state2);

  // 2 => * - click .category-name
  $('#categorize-section').on('click', '.category-name',
    category_name_clicked);

  // 1, 2 => 3 - enter keywords
  $('#search-input').keyup(reveal_filter_list);

  // 3 => 4 - click #create-button
  $('#list-data-container').on('click', '#create-button.active',
    create_category_button_clicked);

  // 4 => 1 - click #cancel-category-creation
  $('#category-created-button #cancel-category-creation').click(goto_state1);

  // 4 => * - click .board-name
  $('#menu-data-container').on('click',
    '#menu-container[board-only="true"] .board-name',
    create_category_move_item);

  $('#board-menu')
  .on('click', '#most-recent', sort_by_recent_toggle)
  .on('click', '#title', sort_by_title_toggle);

}

function sort_by_recent_toggle(e) {
  if ($(this).closest('.list-filter-container').attr('state') == 'most-recent-desc') {
    $('.list-filter-container').attr('state', 'most-recent-asc');
    sort_by_recent(-1);
  } else {
    $('.list-filter-container').attr('state', 'most-recent-desc');
    sort_by_recent(1);
  }
}
function sort_by_title_toggle(e) {
  if ($(this).closest('.list-filter-container').attr('state') == 'title-asc') {
    $('.list-filter-container').attr('state', 'title-desc');
    sort_by_title(-1);
  } else {
    $('.list-filter-container').attr('state', 'title-asc');
    sort_by_title(1);
  }
}

function save_title() {
  var new_title = $('#edit-title').val().trim();
  if (new_title == original_title) {
    return; // Do nothing
  }
  update_item_name();
}

// 0 => 1 - click on #reveal boards button
function show_menu_data(e) {
  $('#categorize-section').attr('state', '1');
  goto_state1();
}

function reveal_filter_list(e) {
  // stp 0. preconditions
  var key = e.keyCode || e.which;
  switch (key) {
    case 27: // ESC
      $(this).val('');
      break;
    default:
  }
  var words = $(this).val().trim();

  var curr_state = $('#categorize-section').attr('state');
  if (words.length > 0) {
    $('#create-button').addClass('active');
    switch (curr_state) {
      case '1':
        $('#categorize-section').attr('state', '3_1');
        break;
      case '2':
        $('#categorize-section').attr('state', '3_2');
        break;
      default:
    }
  } else {
    $('#create-button').removeClass('active');
    switch (curr_state) {
      case '3_1':
        $('#categorize-section').attr('state', '1');
        break;
      case '3_2':
        $('#categorize-section').attr('state', '2');
        break;
      default:
    }
    return;
  }

  // stp 1. build the filtered list
  var result = null;
  words = words.split(/\s+/);
  words.forEach(function(kw) {
    kw = kw.toLowerCase();
    var set = result;
    // the result is empty
    if (!result) {
      set = [];
      //!!!! do clone() for data copying
      // insert category names
      $('#hidden-data').find('.category-name').each(function() {
        // 1. find board name
        var board_name = $(this).closest('.group-container')
          .find('.board-name').text();
        // 2. create a <label> with the board name and
        // insert it into category-name
        var node = $(this).clone();
        $('<label class="in-category">in ' + board_name + '</label>')
          .appendTo(node);
        set.push(node);
      });
    }
    // filtering
    result = $.grep(set, function(cat) {
      var title = $(cat)[0].childNodes[0].nodeValue.trim().toLowerCase();
      return title.indexOf(kw) != -1;
    });
  }); // end function(kw)

  // stp 2. show the result
  $('#filtered-category-names').html(result);

  // stp 3. highlight the keywords
  var regex = new RegExp('(' + words.join('|') + ')', 'ig');
  $('#filtered-category-names').find('.category-name').each(function(idx) {
    var original_text = this.childNodes[0];
    $(this).prepend(original_text.nodeValue.replace(regex, '<b>$1</b>'));
    this.removeChild(original_text);
  });
}

// state 1 shows the list of boards plus Inbox to choose from
function goto_state1(e) {
  clean_menus();
  show_board_names();

  // in case you create a new board, resets the text to it's default content
  $('#menu-container').attr('board-only', 'false')
                    .find('.boards-label').text('Boards')
                    .end()
                    .find('.board-name').removeClass('board-only');

  $('#create-button').removeClass('active');
  $('#search-input').val('').focus();

  $('#categorize-section').attr('state', '1');
}

function create_category_move_item(e) {
  // User has entered a new category name and selected a board for it
  var board_clicked_on = $(this);
  var board_id = board_clicked_on.attr('board-id');
  var item_id = $('#window-container').attr('item-id');

  var category_name = $('#category-created-button .text').text();
  $('#header-notice #saved-to-category').text(category_name);
  $('#selected-category-button .text').text(category_name);
  $('#categorize-section').attr('state', '*');

  // Should use AJAX to create a new category
  // If successful, move the item to that category
  show_loading();
  $.ajax({
    type: 'POST',
    url: HOST_HTTPS + '/categories',
    data: {
      'source': 'xtn-chrome',
      'board_id': board_id,
      'category[name]': category_name,
      'category[position]': '0',
      'category[slot]': '0'
    },
    success: function(data, textStatus, jqXHR) {
      ga('send', 'event', 'category', 'create', 'success');
      // The AJAX request returns an HTML response for the category
      // The HTML contains a category-index that we want to extract
      category_created(data, board_id, jqXHR.getResponseHeader('date'));
      new_category_id = $(data).attr('category-index');
      // We also want to insert the newly created category into the board
      var new_category = $('<div class="category">' +
        '<div class="category-name text" category-id="' +
        new_category_id + '">' + category_name + '</div>' +
        '<ol class="items-list-conatiner" style="display: none;"></ol>' +
        '</div>');
      $('#hidden-data').find('.board-name[board-id="' + board_id + '"]')
        .siblings('.categories-list-container').prepend(new_category);
      // Now move the item into the newly created category
      move_item(item_id, new_category_id, category_name);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      ga('send', 'event', 'category', 'create', 'error');
      show_notice('Having trouble creating category, please retry');
      handle_ajax_error(jqXHR, textStatus, errorThrown);
    }
  });
}

function create_category_button_clicked(e) {
  show_board_names();

  var newCatValue = $('#search-input').val();
  $('#category-created-button .text').html(newCatValue);
  $('#menu-container').attr('board-only', 'true')
                      .find('.boards-label')
                      .text('Add new category to which board?')
                      .end()
                      .find('.board-name').addClass('board-only');

  $('#categorize-section').attr('state', '4');
}

function suggested_clicked(e) {
  var suggested_category = $(this).find('#suggested-category');
  var suggested_category_name = suggested_category.text();
  var suggested_category_id = suggested_category.attr('category-id');
  $('#selected-category-button .text').text(suggested_category_name);
  $('#saved-to-category').text(suggested_category_name);
  $('#categorize-section').attr('state', '*');

  var item_id = $('#window-container').attr('item-id');

  move_item(item_id, suggested_category_id, suggested_category_name);
}

// Click a category name moves the item to the corresponding category
function category_name_clicked(e) {
  e.stopPropagation();
  var selected_category_name = $(this).text();
  $('#selected-category-button .text').text(selected_category_name);
  $('#saved-to-category').text(selected_category_name);
  $('#categorize-section').attr('state', '*');
  var item_id = $('#window-container').attr('item-id');
  var category_id = $(this).attr('category-id');
  move_item(item_id, category_id, selected_category_name);
}

// state 2 is shows the categories within a selected board
function goto_state2(e) {
  clean_menus();

  var selectedBoard = $(this).html();
  // $('#selected-board-button .text').html(selectedBoard);
  $('#prompt-nav').html(selectedBoard);
  $('#menu-data-container').animate({scrollTop: '0'}, 100);
  $('#search-input').val('').focus();

  // populate the menu
  var board_id = $(this).attr('board-id');
  selected_board_id = board_id;
  var new_list = $('#hidden-data')
    .find('.board-name[board-id="' + board_id + '"]')
    .siblings('.categories-list-container')
    .find('.category-name').clone();
  new_list.remove();

  $('#category-names').html(new_list);

  $('#categorize-section').attr('state', '2');
}

// remove the contents of board menu and category menu
function clean_menus() {
  $('#board-names').html('');
  $('#category-names').html('');
}

function show_board_names() {
  // First cleanup
  $('#board-names').children().remove();
  // Find board names
  var board_names = $('#hidden-data').find('.board-name').clone();
  $('#board-names').append(board_names);

  $('#menu-data-container').animate({scrollTop: '0'}, 100);
}

// Animates the notice in the top right by having it slide into place
function header_notice_animation(e) {
  var notice_total_width = 180;
  var notice_short_width = 0;
  $('#header-notice')
    .width(notice_short_width)
    .animate({width: notice_total_width}, 600);
}

// to show the temporary state of loading
function show_loading() {
  $('#header-notice').html("<img src='/assets/extension/loading-dots.gif'>");
}

// to hide the loading hint, to show the notice that the action is finished
function show_notice(msg) {
  $('#header-notice').html(msg);
  header_notice_animation();
}

function remove_item() {
  $('#window-container').attr('status', 'removed');
  var item_id = $('#window-container').attr('item-id');
  if (item_id) {
    // Update the UI
    show_loading();
    $('#categorize-section').attr('state', '0');
    $('#edit-title').val('');

    $.ajax({
      type: 'DELETE',
      url: HOST_HTTPS + '/items',
      data: {
        'source' : 'xtn-chrome',
        'item_ids' : [item_id]
      },
      success: function(data, textStatus, jqXHR) {
        ga('send', 'event', 'item', 'delete', 'success', 1);
        show_notice('Link has been removed :(');
        item_removed(item_id, jqXHR.getResponseHeader('date'));
      },
      error: function(jqXHR, textStatus, errorThrown) {
        ga('send', 'event', 'item', 'delete', 'error', 1);
        show_notice('Having trouble removing the item, please retry');
        handle_ajax_error(jqXHR, textStatus, errorThrown);
      }
    });
  } else {
    setTimeout(remove_item, 500);
  }
}

function add_note(e) {
  $(this).hide();
  note_character_counter.call($('#note-container').show().find('#note-field').select().focus(), e);
}

function save_note(e) {
  var $button = $(this).is('#save-note') ? $(this) : $(this).closest('#title-section').find('#save-note');

  if ($button.hasClass('save-enabled')) {
    $('#window-container').attr('note-exists', 'true');
    $('#character-count').hide();
    $button.hide();
    update_item_note();
    $button.removeClass('save-enabled');
  }
  $('#character-count').hide();
  $button.hide();
}

function note_character_counter(e) {
  // Enter => Blur => Submit
  if (e.type == 'keydown' && e.which == 13) { // ENTER
    e.preventDefault();
    $(this).blur();
  } else {
    // Enable save button if text field has value
    if ($(this).val().trim() !== $(this).attr('data-old-note')) {
      $('#save-note').addClass('save-enabled');
    } else {
      $('#save-note').removeClass('save-enabled');
    }

    $('#save-note').show();
    $('#character-count').show();

    // Auto adjust height of note field based on content
    var note_field = $('#note-field');
    // This part helps reset the height. It collapses the height back down when text is deleted.
    note_field.height(1);
    // This part adjusts the height. - 12 corresponds to the 6px top/bottom padding of the textarea. Removes 12px because otherwise it adds an extra 12px to the calculated height.
    note_field.height(note_field[0].scrollHeight - 12);

    var used = $(this).val().length;
    var count = 100 - used;
    $(this).closest('#note-container').find('#character-count span').text(count);
  }
}

// Update the item, it assumes that the item may not exist.
// Then it waits for it to be created.
function update_item_note() {
  show_loading();
  var item_id = $('#window-container').attr('item-id');
  var $note_field = $('#note-field');
  if (item_id) {
    $.ajax({
      type: 'PUT',
      url: HOST_HTTPS + '/items',
      data: {
                    'source' : 'xtn-chrome',
               'item[index]' : item_id,
         'item[description]' : $note_field.val().trim()
      },
      success: function(data, textStatus, jqXHR) {
        ga('send', 'event', 'item', 'update', 'success');
        show_notice('Note updated');
        $note_field.attr('data-old-note', $note_field.val().trim());
        item_note_updated(data, jqXHR.getResponseHeader('date'));
      },
      error: function(jqXHR, textStatus, errorThrown) {
        ga('send', 'event', 'item', 'update', 'error');
        show_notice('Having trouble updating item note, please retry');
        handle_ajax_error(jqXHR, textStatus, errorThrown);
      }
    });
  } else {
    setTimeout(update_item_name, 500);
  }
}

// Update the item, it assumes that the item may not exist.
// Then it waits for it to be created.
function update_item_name() {
  show_loading();
  var item_id = $('#window-container').attr('item-id');
  if (item_id) {
    $.ajax({
      type: 'PUT',
      url: HOST_HTTPS + '/items',
      data: {
                    'source' : 'xtn-chrome',
               'item[index]' : item_id,
                'item[name]' : $('#edit-title').val().trim()
      },
      success: function(data, textStatus, jqXHR) {
        ga('send', 'event', 'item', 'update', 'success');
        show_notice('Title updated');
        item_name_updated(data, jqXHR.getResponseHeader('date'));
      },
      error: function(jqXHR, textStatus, errorThrown) {
        ga('send', 'event', 'item', 'update', 'error');
        show_notice('Having trouble updating item name, please retry');
        handle_ajax_error(jqXHR, textStatus, errorThrown);
      }
    });
  } else {
    setTimeout(update_item_name, 500);
  }
}

// Move item to the category chosen by user
function move_item(item_id, dest_category_id, category_name) {
  // console.log(new Date().toISOString() + ': move item: ' + item_id + ' ' +
  //   dest_category_id + ' ' + category_name);
  show_loading();

  $.ajax({
    type: 'PUT',
    url: HOST_HTTPS + '/items/move',
    data: {
      'source' : 'xtn-chrome',
      'item_ids' : [item_id],
      'to_category' : dest_category_id,
      'render_item' : true
    },
    success: function(data, textStatus, jqXHR) {
      ga('send', 'event', 'item', 'move', 'xtn-popup', 1);
      show_notice('Moved to <span id="saved-to-category">' +
        category_name + '</span>');
      // Call callbacks in case if necessary
      item_moved(item_id, dest_category_id, data, jqXHR.getResponseHeader('date'));
    },
    error: function(jqXHR, textStatus, errorThrown) {
      ga('send', 'event', 'item', 'move', 'error', 1);
      show_notice('Having trouble moving the item, please retry');
      handle_ajax_error(jqXHR, textStatus, errorThrown);
    }
  });
}

// This tracks every click
function register_click_listeners() {
  document.addEventListener('click', function(event) {
    // For UI clicks, category is the assigned screen name in 'body' tag
    var category = $('body').attr('ga-screen') || 'ScreenOther';
    // Event label: Use explicitly assigned ga-label
    // or fall back to target's class attribute instead
    var label = $(event.target).closest('[ga-label]').attr('ga-label') ||
      event.target.className;
    var target_id = $(event.target).closest('[id]').attr('id');
    var full_ga_label = '(#' + target_id + ', ' + label + ')';
    // Parameters: 'send', 'event', category, action, label
    ga('send', 'event', category, 'click', full_ga_label);
  });
}

function sort_by_current() {
  switch ($('.list-filter-container').attr('state')) {
    case 'most-recent-asc': sort_by_recent(-1); break;
    case 'most-recent-desc': sort_by_recent(1); break;
    case 'title-asc': sort_by_title(1); break;
    case 'title-desc': sort_by_title(-1); break;
  }
}

// Sort boards by last update, defaults to descending (Most recent first)
function sort_by_recent(mult) {
  function criterion(board) {
    return new Date($(board).find('.board-name').attr('board-last-update'));
  }
  sort(function(a, b) {
    return (criterion(a) < criterion(b) ? 1 : -1) * mult;
  });
}

// Sort boards by title, defaults to ascending
function sort_by_title(mult) {
  function criterion(board) {
    return $(board).find('.board-name').text();
  }
  sort(function(a, b) {
    return (criterion(a) < criterion(b) ? -1 : 1) * mult;
  });
}

// Sorts hidden data and then show_board_names clones it
function sort(comparator) {
  var groups_container = $('#groups-container');
  var group_container = groups_container.find('.group-container').detach();
  group_container.sort(comparator);
  groups_container.append(group_container);
  show_board_names();
  $('#menu-data-container').animate({scrollTop: '0'}, 100);
}

// Functions that need to be overwritten in a separate js
// function init_newitem() {}
// function view_item() {}
// function update_suggested_category() {};
// function update_boards_list() {};
// function item_removed(item_id, timestamp) {}
// funciton item_note_updated(item_html, timestamp) {}
// funciton item_name_updated(item_html, timestamp) {}
// function item_moved(item_id, dest_category_id, item_data, timestamp) {};
// function category_created(category_html, board_id, timestamp) {}
// function handle_ajax_error(jqXHR, textStatus, errorThrown);
