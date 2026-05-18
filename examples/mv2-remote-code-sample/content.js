chrome.runtime.onMessage.addListener(function (message) {
  if (message && message.cmd === "render") {
    setTimeout("document.body.setAttribute('data-risk', 'detected')", 300);
  }
});

eval("console.log('content script eval used by sample')");
