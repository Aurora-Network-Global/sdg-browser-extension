// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchScript') {
    fetch('https://aurora-sdg.labs.vu.nl/resources/widget.js')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.text();
      })
      .then(scriptContent => {
        console.log('Script fetched successfully');
        sendResponse({ scriptContent });
      })
      .catch(error => {
        console.error('Error fetching script:', error);
        sendResponse({ scriptContent: null, error: error.message });
      });
    return true;  // Keep the message channel open for sendResponse
  }
});
