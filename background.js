
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (
        changeInfo.status === "complete" &&
        tab.url &&
        (tab.url.startsWith("http://") || tab.url.startsWith("https://"))
    ) {
        const url = new URL(tab.url);
        const hostname = url.hostname.toLowerCase();
        const pathname = url.pathname.toLowerCase();

        const suspiciousWords = ["login", "secure", "bonus", "gift", "verify", "support"];
        const isHttp = url.protocol === "http:";
        const inDomain = suspiciousWords.some(word => hostname.includes(word));
        const inPath = suspiciousWords.some(word => pathname.includes(word));

        if (isHttp || inDomain || inPath) {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: () => {
                    alert("⚠️ Внимание: этот сайт может быть фишинговым.\n⚠️ Сак болуңуз! Бул сайт фишинг болушу мүмкүн.\n⚠️ Warning: This website may be a phishing attempt.");
                }
            }).catch(err => console.warn("Ошибка при выводе предупреждения:", err.message));
        }
    }
});
