var bgPage=chrome.extension.getBackgroundPage(),tab,notes,disableSaveOnClose=!1;function e(a){return document.getElementById(a)}function handleEncOptionsVisibility(){var a=bgPage.options.get("disable_encryption");e("encrypt").checked?(e("encryption-option").style.display="block",e("encrypt-passphrase-div").style.display="block"):a&&(e("encryption-option").style.display="none")}
function enableEdit(){e("notes").className="editable";e("notes").focus();e("checkbox-div").style.display="block";moveCursorToTheEnd(e("notes"));e("edit").innerHTML="Save";handleEncOptionsVisibility()}function afterEdit(){e("notes").className="";saveNotes()&&(e("edit").innerHTML="Edit",window.close())}
function saveNotes(){e("warning").innerHTML="";var a=e("notes").innerHTML.replace(/&nbsp;/gi," ").trim();if(!a)return e("warning").innerHTML="Notes cannot be empty.",enableEdit(),0;var b=!1;if(!0===e("encrypt").checked){b=e("encrypt-passphrase").value.trim();if(""===b)return e("warning").innerHTML="Passphrase cannot be empty.",enableEdit(),0;var c=e("verify-passphrase").value.trim();if(b!==c)return e("warning").innerHTML="Passphrases don't match.",enableEdit(),0;a=bgPage.CryptoJS.AES.encrypt(a,b).toString();
b=!0}notes=[a,new Date,b];!1===e("sitelevel").checked?bgPage.pageNotes.setNotesObj(tab.url,notes):(bgPage.pageNotes.remove(tab.url),bgPage.pageNotes.setNotesObj(tab.host(),notes));bgPage.updateBadgeForTab(tab);localStorage.lastModTime=(new Date).getTime();return 1}
function handleDecrypt(){e("warning").innerHTML="";var a=e("decrypt-passphrase").value;if(""===a)e("warning").innerHTML="Decrypt passphrase cannot be empty.";else{var b=bgPage.CryptoJS.AES.decrypt(notes[0],a).toString(bgPage.CryptoJS.enc.Utf8);""===b?e("warning").innerHTML="Wrong passphrase.":(e("notes").innerHTML=b,e("decrypt-passphrase-div").style.display="none",e("edit").innerHTML="Edit",e("encrypt").checked=!0,e("encrypt-passphrase").value=a,e("verify-passphrase").value=a)}}
function setupEditButtonHandler(){e("edit").addEventListener("click",function(){"Save"===e("edit").innerHTML.trim()?afterEdit():"Edit"===e("edit").innerHTML.trim()?enableEdit():"Decrypt"===e("edit").innerHTML.trim()&&handleDecrypt()},!0);e("encrypt").addEventListener("click",function(){!0===e("encrypt").checked?e("encrypt-passphrase-div").style.display="block":e("encrypt-passphrase-div").style.display="none"},!0)}
function fixDeleteButton(a,b){if(""===a||b)e("delete").remove();else{var c=function(){bgPage.updateBadgeForTab(tab);disableSaveOnClose=!0;window.close()};e("delete").addEventListener("click",function(){bgPage.deleteButtonHandler(this,a,c,"Are you sure you want to delete notes for this page? ")})}}
function updatePopUpForTab(a){tab=a;tab.host=function(){return bgPage.getHostFromUrl(tab.url)};a=tab.url;if(notes=bgPage.pageNotes.getNotesObj(a))e("sitelevel").checked=!1;else if(a=tab.host(),notes=bgPage.pageNotes.getNotesObj(a))e("sitelevel").checked=!0;notes?3<=notes.length&&notes[2]?(e("notes").innerHTML="***************",e("decrypt-passphrase-div").style.display="block",e("edit").innerHTML="Decrypt"):e("notes").innerHTML=notes[0]:(enableEdit(),e("sitelevel").checked=!bgPage.options.get("disable_sitelevel_default"));
fixDeleteButton(a,!notes);localStorage.gFile||(document.getElementById("setup-sync").style.visibility="")}function moveCursorToTheEnd(a){var b=document.createRange();b.selectNodeContents(a);b.collapse(!1);a=window.getSelection();a.removeAllRanges();a.addRange(b)}function setupUnloadEvent(){addEventListener("unload",function(a){disableSaveOnClose||"Save"!==e("edit").innerHTML.trim()||saveNotes()},!0)}window.setTimeout(function(){e("sitelevel").blur()},100);
document.addEventListener("DOMContentLoaded",function(){setupEditButtonHandler();handleEncOptionsVisibility();chrome.tabs.getSelected(null,updatePopUpForTab);setupUnloadEvent()});
