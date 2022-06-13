// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log("DID addon installed.");
});

// listener for incoming messages, as of now, no further functionality
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.content);
});
