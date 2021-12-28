class BackgroundPage {
    initialize() {
        chrome.browserAction.onClicked.addListener((tab) => this.onIconClicked(tab));
    }
    onIconClicked(tab) {
        const host = new URL(tab.url).hostname.toLowerCase();
        if (host != "meet.google.com") {
            return;
        }
        chrome.tabs.executeScript({
            file: "/js/inject.js",
        });
    }
}
new BackgroundPage().initialize();
//# sourceMappingURL=background.js.map