// ==UserScript==
// @name         Chess.com Analysis Bulk Deleter
// @namespace    https://github.com/georgegognadze/chess-com-bulk-deleter
// @description  Deletes analysis items reliably by waiting for the list to update.
// @version      1
// @author       George Gognadze
// @match        https://www.chess.com/analysis/saved*
// ==/UserScript==
(async function () {
    'use strict';
    const CONFIG = {
        PAGE_LOAD_WAIT: 2000,
        ACTION_DELAY: 500,
        MAX_RETRIES: 50
    };
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function getTrashButtons() {
        return document.querySelectorAll('.saved-analysis-item-remove');
    }
    function getYesButton() {
        const buttons = document.querySelectorAll('button.cc-button-primary');
        for (let btn of buttons) {
            if (btn.textContent.trim() === 'Yes') return btn;
        }
        return null;
    }
    async function waitForListUpdate(originalCount) {
        for (let i = 0; i < CONFIG.MAX_RETRIES; i++) {
            const currentCount = getTrashButtons().length;
            if (currentCount < originalCount) {
                return true;
            }
            await sleep(100);
        }
        return false;
    }
    console.log("🤖 Auto-Deleter v1: Starting...");
    await sleep(CONFIG.PAGE_LOAD_WAIT);
    let safetyCounter = 0;
    const MAX_ITEMS_PER_BATCH = 100;
    while (safetyCounter < MAX_ITEMS_PER_BATCH) {
        const trashButtons = getTrashButtons();
        const currentCount = trashButtons.length;
        if (currentCount === 0) {
            console.log("✅ No more items found on this page.");
            break;
        }
        try {
            console.log(`🗑️ Deleting item (Current count: ${currentCount})...`);
            trashButtons[0].click();
            let yesButton = null;
            for (let i = 0; i < 20; i++) {
                yesButton = getYesButton();
                if (yesButton) break;
                await sleep(100);
            }
            if (yesButton) {
                await sleep(200);
                yesButton.click();
                const updated = await waitForListUpdate(currentCount);
                if (!updated) {
                    console.warn("⚠️ List didn't update in time. Waiting extra long...");
                    await sleep(2000);
                }
            } else {
                console.warn("⚠️ Popup skipped or not found. Retrying...");
                await sleep(1000);
            }
        } catch (err) {
            console.error("❌ Error:", err);
            await sleep(1000);
        }
        safetyCounter++;
    }
    console.log("🔄 Batch complete. Reloading...");
    if (window.location.href.includes('page=1')) {
        window.location.reload();
    } else {
        window.location.href = "https://www.chess.com/analysis/saved?page=1";
    }
})();
