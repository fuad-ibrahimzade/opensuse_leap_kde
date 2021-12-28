function log_time(messege) {
  if (console != undefined) {
    //console.log(new Date().toISOString() + ": " + messege);
  }
}

//function sleep1() {
//    for (var i=0; i<100000000; i++) {
//            var a = a + a;
//    }
//}

chrome.tabs.onCreated        .addListener(function(a, b, c){console.log(new Date().toISOString() + ": " + "chrome.tabs.onCreated        ");console.log(a);console.log(b);console.log(c);});
chrome.tabs.onUpdated        .addListener(function(a, b, c){console.log(new Date().toISOString() + ": " + "chrome.tabs.onUpdated        ");console.log(a);console.log(b);console.log(c);});
chrome.tabs.onMoved          .addListener(function(a, b, c){console.log(new Date().toISOString() + ": " + "chrome.tabs.onMoved          ");console.log(a);console.log(b);console.log(c);});
chrome.tabs.onActivated      .addListener(function(a, b, c){console.log(new Date().toISOString() + ": " + "chrome.tabs.onActivated      ");console.log(a);console.log(b);console.log(c);});
chrome.tabs.onHighlighted    .addListener(function(a, b, c){console.log(new Date().toISOString() + ": " + "chrome.tabs.onHighlighted    ");console.log(a);console.log(b);console.log(c);});
chrome.tabs.onDetached       .addListener(function(a, b, c){console.log(new Date().toISOString() + ": " + "chrome.tabs.onDetached       ");console.log(a);console.log(b);console.log(c);});
chrome.tabs.onAttached       .addListener(function(a, b, c){console.log(new Date().toISOString() + ": " + "chrome.tabs.onAttached       ");console.log(a);console.log(b);console.log(c);});
chrome.tabs.onRemoved        .addListener(function(a, b, c){console.log(new Date().toISOString() + ": " + "chrome.tabs.onRemoved        ");console.log(a);console.log(b);console.log(c);});
chrome.tabs.onReplaced       .addListener(function(a, b, c){console.log(new Date().toISOString() + ": " + "chrome.tabs.onReplaced       ");console.log(a);console.log(b);console.log(c);});
chrome.windows.onCreated     .addListener(function(a, b, c){console.log(new Date().toISOString() + ": " + "chrome.windows.onCreated     ");console.log(a);console.log(b);console.log(c);});
chrome.windows.onRemoved     .addListener(function(a, b, c){console.log(new Date().toISOString() + ": " + "chrome.windows.onRemoved     ");console.log(a);console.log(b);console.log(c);});
chrome.windows.onFocusChanged.addListener(function(a, b, c){console.log(new Date().toISOString() + ": " + "chrome.windows.onFocusChanged");console.log(a);console.log(b);console.log(c);});
chrome.history.onVisited     .addListener(function(a, b, c){console.log(new Date().toISOString() + ": " + "chrome.history.onVisited     ");console.log(a);console.log(b);console.log(c);});
chrome.bookmarks.onCreated   .addListener(function(a, b, c){console.log(new Date().toISOString() + ": " + "chrome.history.onVisited     ");console.log(a);console.log(b);console.log(c);});
