// This content script is here because our users expect the papaly.com page
// to behave exactly the same as the newtab. To make this happen, we need to
// run some javascript on the page to override import related behaviors.
// In case when user clicks import on a papaly page, then instead of importing
// it should send a message to background page which will do the import and
// the callback will refresh the page.

// The import function
// Sends message to background page and waits for callback
function import_chrome(type, board_id) {
  block_app();
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
        var recieved = $(data).clone();
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

// Registers the click event on boards
// When clicked send a message to background page.
// Check background_message for reference.
var papaly_boards = document.getElementById('boards') ||
  document.getElementById('boards-container');
if (papaly_boards) {
  papaly_boards.addEventListener('click', function(event) {
    var n = event.target;
    // This will go all the way back to document which has no classList
    while (n && n.id != 'boards' && n.classList) {
      if (n.classList.contains('populate-option-chrome-bookmarks')) {
        return import_chrome('bookmarks', get_board_id(n));
      } else {
        n = n.parentNode;
      }
    }
  });
}

////////////////////////////////////////////////////////////////////////////////
// Everything down here are copied from other libraries. This is because the
// Content script has it's own scope and cannot access the functions on the
// page. Therefore, to get it to work, we are overriding the click, this cause
// the click to be handled by the extension only, which loads the preview
// dialog. And due to the fact that it's loaded in the context script scope,
// it does not have access to load_dialog, show_flash_message and many other
// essential functions. We have to copy then over so that they work.
//
// After the input is loaded, the scope is this script + import_preview.js
// These two are written in a way that they are self contained.

// Show an "Importing..." message to user. Notice that we are redefining the
// same function because content script does not have any access to the
// javascript functions on the page.
function block_app(message) {
  var app_loading = $('#app-loading').show();
  app_loading.find('.loading-message').hide();
  var message = app_loading.find('#app-loading-message-' + message);
  if (message.size() == 0) {
    message = app_loading.find('#app-loading-message-default');
  }
  message.show();
}
function release_block() {
  $('#app-loading').hide().find('.loading-message').hide();
}

// Tool function to get the import target.
function get_board_id(node) {
  var n = node;
  while (n && n.id != 'boards') {
    if (n.classList.contains('board')) {
      return n.getAttribute('board-id');
    } else {
      n = n.parentNode;
    }
  }
  return '-1';
}

function close_dialog(event) {
  event && event.preventDefault();
  // Ignore if no main, just a dialog, for login/register
  if ($('#main').length == 0) return;
  // Close the dialog
  $('#main').removeClass('blurred');
  $('#dialog-container').remove();
}

function load_dialog_success(data, button) {
  // step 1. inject form
  $('#dialog-container').remove();
  $('body').append(data);

  $('#main').addClass('blurred');

  // step 3. register listeners
  $('#dialog-container')
    .on('click', '#dialog-block, #dialog-close-button, .close-dialog, ' +
      '.dialog-button.cancel-button, #cancel-link, .cancel-action', close_dialog);

}

// Show a notice to the user in the top right
var flash_notice_count = 0;
function show_flash_notice(message, status) {
  var flash_notice_duration = 4000;
  if (!status || status === 'ok') {
    status = 'ok';
    flash_notice_duration = 4000;
  } else if (status === 'delete') {
    flash_notice_duration = 10000;
  } else if (status === 'error') {
    flash_notice_duration = 4000;
  }
  var notice = $('#flash-notice');
  // Change the CSS and HTML of the notice
  notice.attr('status', status);
  notice.find('.flash-notice-label').html(message);

  if (typeof undo_action != 'undefined') {
    // Register click handler for undo delete
    notice.find('#undo_action').click(undo_action);
  }

  // Show by animating entrance from the top
  notice.attr('state', '2');

  // Automatically hide the notice after it has been shown for a while
  flash_notice_count += 1;
  var timer_count = flash_notice_count;
  setTimeout(function() {
    // If the timer has finished as many times as it started, hide the notice
    // Otherwise the timer might hide a later notice too soon
    if (timer_count == flash_notice_count) {
      hide_flash_notice();
    }
  }, flash_notice_duration);
}


function hide_flash_notice() {
  var notice = $('#flash-notice');
  // Slide off screen to remove
  notice.attr('state', '3');
  setTimeout(function() { notice.attr('state', '1')}, 600);
}
