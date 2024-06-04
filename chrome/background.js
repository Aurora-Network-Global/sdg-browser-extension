// background.js
/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchScript') {
      fetch('https://aurora-sdg.labs.vu.nl/resources/widget.js')
        .then(response => response.text())
        .then(scriptContent => sendResponse({ scriptContent }))
        .catch(error => console.error('Error fetching script:', error));
      return true;  // Keep the message channel open for sendResponse
    }
  });
  */