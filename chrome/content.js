// content.js

(function() {
  // Create a container for the SDG wheel
  const sdgContainer = document.createElement('div');
  sdgContainer.className = 'sdg-wheel';
  sdgContainer.setAttribute('data-wheel-height', '250');
  sdgContainer.setAttribute('data-model', 'aurora-sdg-multi');
  sdgContainer.setAttribute('data-text', document.body.innerText);

  // Inject the container into the page
  document.body.appendChild(sdgContainer);

  // Request the widget.js script content from the background script
  chrome.runtime.sendMessage({ action: 'fetchScript' }, (response) => {
    if (response && response.scriptContent) {
      // Use chrome.scripting.executeScript to execute the fetched script content
      chrome.scripting.executeScript({
        target: { allFrames: true },
        func: new Function(response.scriptContent)
      });
    } else {
      console.error('Failed to load the widget script.');
    }
  });

  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSDGData') {
      const sdgData = sdgContainer.getAttribute('data-text');
      sendResponse({ sdgData: sdgData });
    }
  });
})();

