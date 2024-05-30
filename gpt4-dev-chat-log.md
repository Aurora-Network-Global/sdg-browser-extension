# GPT4 developer chatlog: SDG Browser Extension
Chatlog I had with GTP4 to generate the code for this SDG browser extension.

[link to shared chat](https://chatgpt.com/share/2525fd28-18da-4be9-9080-05c32c474ace)
[link to editable chat, login required](https://chatgpt.com/c/05684878-ed45-45f4-872b-2e3f479dcfb6)

## My question:

I want to build a chrome extension for the United Nations Sustainable Development Goals (SDG's), that shows me an image that hovers at the center right side of the browser, that shows how related the text on the web page is to each of the SDG's. How do I start?

I have already a code snippet that produces the image using the following instructions:

Copy the following html snippet to the place where you want to display the badge:
```html
<div class="sdg-wheel" data-wheel-height="250" data-model="aurora-sdg-multi" data-text="insert text from webpage here"></div>
```

Add the following JavaScript snippet to the bottom of your page:

```js
<script src="https://aurora-sdg.labs.vu.nl/resources/widget.js" type="text/javascript"></script>
```

---------------

## Answer by GPT4

Building a Chrome extension that displays an image related to the United Nations Sustainable Development Goals (SDGs) based on the content of the web page involves several steps. Here’s a high-level outline of what you need to do, followed by more detailed steps:

Set up your Chrome extension structure.
Inject the HTML snippet into web pages.
Inject the JavaScript snippet to process the text and display the badge.
Handle permissions and background processing.

### Step 1: Update `manifest.json`

Ensure your manifest file includes the correct permissions and references to your files. Here’s an updated example:

```json
{
  "manifest_version": 3,
  "name": "SDG Relevance Indicator",
  "version": "1.0",
  "description": "Shows how related the text on the web page is to each of the SDGs.",
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

### Step 2: Create `popup.html`

Create a simple HTML file for your popup:

```html
<!DOCTYPE html>
<html>
<head>
  <title>SDG Relevance Indicator</title>
  <style>
    body {
      width: 300px;
      font-family: Arial, sans-serif;
    }
    #sdg-content {
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <h1>SDG Relevance Indicator</h1>
  <div id="sdg-content">Analyzing...</div>
  <script src="popup.js"></script>
</body>
</html>
```

### Step 3: Create `popup.js`

Create a JavaScript file that will handle updating the popup content:

```javascript
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
```

### Step 4: Update `content.js`

Ensure your `content.js` properly injects the SDG wheel:

```javascript
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

  // Inject the widget.js script into the page
  const script = document.createElement('script');
  script.src = 'https://aurora-sdg.labs.vu.nl/resources/widget.js';
  script.type = 'text/javascript';
  document.body.appendChild(script);
})();
```

### Step 5: Ensure File Paths and Load Extension

1. Make sure all file paths in your `manifest.json` are correct and all necessary files exist.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" using the toggle at the top right.
4. Click "Load unpacked" and select the directory containing your extension.

### Step 6: Test Your Extension

1. Open a new tab and navigate to any webpage.
2. Click on your extension icon to open the popup.
3. The popup should display the SDG relevance data based on the content of the active tab.

By following these steps, your popup should dynamically update with the SDG relevance data extracted from the content script. Ensure your content script and popup script are communicating correctly and that the data is being properly retrieved and displayed.