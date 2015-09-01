chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
    if (req.action == 'openMainPage') {
        chrome.tabs.create({ 'url': chrome.extension.getURL('index.html') });
    }
})
