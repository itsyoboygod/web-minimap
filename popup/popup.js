document.getElementById('minimap_size').addEventListener('input', function () {
    const minimapSize = this.value;
    chrome.runtime.sendMessage({ action: 'updateMinimapSize', value: minimapSize });
});

document.getElementById('minimap_opacity').addEventListener('input', function () {
    const minimapOpacity = this.value;
    chrome.runtime.sendMessage({ action: 'updateMinimapOpacity', value: minimapOpacity });
});

document.getElementById('minimap_viewer').addEventListener('input', function () {
    const minimapViewer = this.value;
    chrome.runtime.sendMessage({ action: 'updateMinimapViewer', value: minimapViewer });
});

document.getElementById('minimap_scale').addEventListener('input', function () {
    const minimapScale = this.value;
    chrome.runtime.sendMessage({ action: 'updateMinimapScale', value: minimapScale });
});