// This javascript handles the search engine pages. If user likes, we will
// try to search within user's own profile on Papaly and display matching
// items in his own collection.
// The javascript has three parts:
// 1. Displays papaly result if user allows.
// 2. Handles the click correctly, be aware of cross domain
// 3. Handles if user choose to opt out.
// The result should keep Google/Bing results intact. Just add a section for
// Papaly. We do not want to affect normal usage of search engine.

// Send message to background page so that it tries to query it
// Content script does not have access to the background pages.
// It can only communicate through messages.
function get_and_insert_papaly() {
  var search_keyword = get_search_keyword();
  if (search_keyword) {
    chrome.runtime.sendMessage({
      messageId: 'searchKeyword',
      keyword: search_keyword
    }, function(response) {
      // console.log("Got Response");
      var papaly_obj = response;
      if (!papaly_obj || !(papaly_obj.shortcuts.length || papaly_obj.items.length)) {
        remove_papaly_node();
        return;
      }
      // console.log('Get the node')
      var papaly_node = get_papaly_node(papaly_obj);
      // console.log('Inject the node');
      insert_papaly_node(papaly_node);
    });
  } else {
    // If the computer is too fast, then the input may not be there in the case of refresh
    setTimeout(get_and_insert_papaly, 200);
  }
}

// We want to bind the search events once and for all.
// This will listen to changes in user's keywords and try to refresh
// the papaly part of the search.
function bind_search_input_events() {
  // console.log("Binding events");
  if (document.location.origin.match('www.google')) {
    // First we bind to the search event
    var search_input = document.querySelector('input[name="q"][type="text"]');
    if (search_input) {
      search_input.addEventListener('change', get_and_insert_papaly);
    }
    // Then we also bind to the event when the search result is first inserted into the dom
    if (!document.getElementById('cnt') && document.getElementById('main')) {
      document.getElementById('main').addEventListener('DOMNodeInserted', function(event) {
        if (event.target.id == 'cnt') {
          get_and_insert_papaly();
        }
      });
    }
  } else if (document.location.origin.match('www.bing.com')) {
    // Listens for #sa_qs value attribute 'ds' => 'bs'
    // NB: #sa_qs gets replaced, so each search yields another search
    if (window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver) {
      var observer = new MutationObserver(function(mutations, observer) {
        mutations.forEach(function(mutation) {
          if ((mutation.target).getAttribute('id') == 'sa_qs' &&
              mutation.oldValue == 'ds' &&
              mutation.target.getAttribute('value') == 'bs') {
            get_and_insert_papaly();
          }
        });
      });
      // Bing's ajax replaces multiple fields including #sa_qs, so we must register the listener on an ancestor
      var ancestor = document.getElementsByClassName('b_headBorder')[0];
      observer.observe(ancestor, {
        subtree: true,
        attributes: true,
        attributeOldValue: true
      });
    }
  }
}

// Depending on the search engine of choice, pull the keyword. Notice this
// part changes from time to time because search engines keep changing their
// page structure.
function get_search_keyword() {
  if (document.location.origin.match('www.google')) {
    // Google search input's id seems to be changing over time
    var input = document.querySelector('input[name="q"][type="text"]');
    if (input && input.value) {
      return input.value;
    }
    // Attempt to pull it from hash
    var qhash = document.location.hash;
    if (qhash.match(/#q=/)) {
      var qword = document.location.hash.replace('#q=', '');
      if (qword.length > 0) {
        return qword;
      }
    }
  } else if (document.location.origin.match('www.bing.com')) {
    // Bing's input id hasn't changed for a while

    var search_input = document.getElementById('sb_form_q');
    if (search_input) {
      // console.log(search_input.value);
      return search_input.value;
    }
  }
  return null;
}

// Tool function to insert Papaly results into the search engine results.
// Style it such that it does not conflict with default search.
function insert_papaly_node(papaly_node) {
  var old_papaly_node = document.getElementById('papaly-embedded-module');
  if (old_papaly_node) {
    // Existing
    old_papaly_node.parentNode.replaceChild(papaly_node, old_papaly_node);
  }
  if (document.location.origin.match('www.google')) {
    var parent_node = document.getElementById('res');
    if (parent_node) {
      var next_node = document.getElementById('search') || parent_node.firstChild;
      parent_node.insertBefore(papaly_node, next_node);
    }
  } else if (document.location.origin.match('www.bing.com')) {
    document.getElementById('b_results').insertBefore(papaly_node, document.getElementById('b_results').firstChild);
  }
  // Performs setup on the new node
  initialize_search_results();
}

// Creates a papaly node from the query result.
function get_papaly_node(papaly_obj) {
  // Given that this was called, we know that, at the least, either shortcuts or items are present
  return render('content_search/embedded_search_results', {
    locals: {
      shortcuts: papaly_obj.shortcuts,
      shortcuts_count: papaly_obj.shortcuts.length,
      items: papaly_obj.items,
      items_count: papaly_obj.items.length
    }
  });
}

// In case if user does not like the Papaly result, remove the node.
function remove_papaly_node() {
  var papaly_node = document.getElementById('papaly-embedded-module');
  if (papaly_node) {
    papaly_node.parentNode.removeChild(papaly_node);
  }
}

// Syntactic sugar to mimic Rails' syntax for rendering erb
// options only supports locals property
function render(path, options) {
  // Appends .ejs if it is not supplied
  path = path.match(/\.ejs$/) ? path : path + '.ejs';
  options = options || {};
  // Filters out comments and loose text nodes
  return $(new EJS({url: chrome.extension.getURL(path)}).render(options.locals)).filter('*')[0];
}

// Action part
// Query Papaly to get the list and insert into the proper place in current
// search page
get_and_insert_papaly();
// Register listener to respond to keyword change
bind_search_input_events();
