// popup.js

// Function to receive the relevance data from the content script
function updateSDGContent(message) {
  document.getElementById('sdg-content').innerText = message.sdgData;
}

// Send a message to the content script to fetch the SDG relevance data
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabs[0].id },
      func: () => {
        // Retrieve the SDG relevance data (this is where you'd integrate your logic)
        const sdgData = document.querySelector('.sdg-wheel').getAttribute('data-text');
        return { sdgData };
      },
    },
    (results) => {
      if (results && results[0]) {
        updateSDGContent(results[0].result);
      } else {
        document.getElementById('sdg-content').innerText = 'No data available.';
      }
    }
  );
});
