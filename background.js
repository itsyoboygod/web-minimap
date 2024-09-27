chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'updateMinimapSize') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'updateMinimapSize', value: message.value });
        });
    }
    if (message.action === 'updateMinimapOpacity') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'updateMinimapOpacity', value: message.value });
        });
    }
    if (message.action === 'updateMinimapViewer') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'updateMinimapViewer', value: message.value });
        });
    }
    if (message.action === 'updateMinimapScale') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'updateMinimapScale', value: message.value });
        });
    }
});
