// We use Chrome's new style of setting options.

function update_locale() {
  document.title = chrome.i18n.getMessage('option_title');

  document.getElementById('option_title').innerHTML = chrome.i18n.getMessage('option_title');
  document.getElementById('option_newtab_title').innerHTML = chrome.i18n.getMessage('option_newtab_title');
  document.getElementById('option_newtab_papaly').innerHTML = chrome.i18n.getMessage('option_newtab_papaly');
  document.getElementById('option_newtab_chrome').innerHTML = chrome.i18n.getMessage('option_newtab_chrome');
  document.getElementById('option_newtab_blank').innerHTML = chrome.i18n.getMessage('option_newtab_blank');
  document.getElementById('option_newtab_custom').innerHTML = chrome.i18n.getMessage('option_newtab_custom');
  document.getElementById('option_search').innerHTML = chrome.i18n.getMessage('option_search');

  document.getElementById('newtab-custom-url').placeholder = chrome.i18n.getMessage('option_newtab_custom_custom_url');
}
update_locale();

var custom_url = document.getElementById('newtab-custom-url');
// Option for newtab
document.getElementById('newtab').addEventListener('input', function(event) {
  custom_url.setAttribute('style', 'display: none;');
  var newtab_setting = event.target.selectedOptions[0].value;
  switch (newtab_setting) {
    case 'custom':
      custom_url.setAttribute('style', 'display: block;');
      break;
    case 'chrome':
    case 'blank':
      break;
    default:
      newtab_setting = 'papaly';
  }
  chrome.extension.getBackgroundPage().newtab.setting = newtab_setting;
  chrome.storage.sync.set({'newtab': chrome.extension.getBackgroundPage().newtab});
});

custom_url.addEventListener('change', function(event) {
  chrome.extension.getBackgroundPage().newtab.custom_url = custom_url.value;
  chrome.storage.sync.set({'newtab': chrome.extension.getBackgroundPage().newtab});
});

// Option for newtab
document.getElementById('search').addEventListener('click', function(event) {
  if (event.target.checked) {
    // Turn this back on
    chrome.extension.getBackgroundPage().papaly_search_start = new Date().getTime();
    chrome.extension.getBackgroundPage().papaly_search_interval = 1000 * 3600 * 24 * 7;
    chrome.storage.local.remove(['papaly_search_start', 'papaly_search_interval']);
  } else {
    // Turn this permanently off
    chrome.extension.getBackgroundPage().papaly_search_start = new Date().getTime() + 1000 * 3600 * 24 * 365 * 10; // 10 years
    chrome.extension.getBackgroundPage().papaly_search_interval = 1000 * 3600 * 24 * 7;
    chrome.storage.local.set({
      'papaly_search_start': new Date().getTime() + 10000 * 3600 * 24 * 365,
      'papaly_search_interval': 1000 * 3600 * 24 * 7
    });
  }
});

document.addEventListener('DOMContentLoaded', restore_options);

// Load the current options from background page.
function restore_options() {
  // Deselects everything to prevent double selection
  Array.prototype.forEach.call(document.querySelectorAll('option[selected]'), function(selected) {
    selected.removeAttribute('selected');
  });

  if (chrome.extension.getBackgroundPage().papaly_search_start <= new Date().getTime()) {
    document.getElementById('search').checked = true;
  }

  var newtab_setting = chrome.extension.getBackgroundPage().newtab.setting;
  if (newtab_setting == 'custom') {
    custom_url.setAttribute('style', 'display: block;');
  }
  document.querySelector('option[value="' + newtab_setting + '"]').setAttribute('selected', 'selected');

  custom_url.value = chrome.extension.getBackgroundPage().newtab.custom_url;
}
