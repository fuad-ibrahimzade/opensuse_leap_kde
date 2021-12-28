(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-44812927-1', 'auto');
ga('set', 'checkProtocolTask', function(){}); // Skip protocol check for http/https by overriding with blank function to allow chrome://
ga('require', 'displayfeatures');
// Record a pageview with the default parameters
var ga_user_id = chrome.extension.getBackgroundPage().ga_user_id;
if (ga_user_id) {
  ga('set', '&uid', ga_user_id);
  ga('set', 'dimension1', ga_user_id);
}
ga('send', 'pageview', '/xtn-chrome/popup');
ga('send', 'event', 'xtn-chrome', 'popup');
