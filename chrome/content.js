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
  
    // Request the external script content from the background script
    /*chrome.runtime.sendMessage({ action: 'fetchScript' }, response => {
      if (response && response.scriptContent) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.text = response.scriptContent;
        document.body.appendChild(script);
      } else {
        console.error('Failed to load the external script');
      }
    });
    */
  
    // Create a script element to load the local widget.js file
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('widget.js');
    script.type = 'text/javascript';
    document.body.appendChild(script);

    // Listen for messages from the popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'getSDGData') {
        const sdgData = sdgContainer.getAttribute('data-text');
        sendResponse({ sdgData: sdgData });
      }
    });
  })();
