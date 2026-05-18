importScripts("https://cdn.example.net/remote-init.js");

function boot() {
  var payload = "console.log('remote loader executed');";
  eval(payload);
  var build = new Function('return ' + payload)();
  setTimeout("console.log('inline timeout string')", 1000);
  return build;
}

chrome.runtime.onInstalled.addListener(function () {
  boot();
});
