document.addEventListener('keydown', function(event) {
    chrome.storage.sync.get({
        d20ShortcutKey: 'R', // Varsayılan Değer
        d12ShortcutKey: 'D', // Varsayılan Değer
        clearShortcutKey: 'C' // Varsayılan Değer
    }, function(items) {
        if (event.key.toUpperCase() === items.d20ShortcutKey.toUpperCase()) {
            const d20Button = document.querySelector('div[data-dice="d20"]');
            if (d20Button) {
                d20Button.click();
                setTimeout(() => {
                    const rollButtons = Array.from(document.querySelectorAll('button'));
                    const rollButton = rollButtons.find(button => button.textContent.includes('Roll'));
                    if (rollButton) {
                        rollButton.click();
                    }
                }, 500);
            }
        }

        if (event.key.toUpperCase() === items.d12ShortcutKey.toUpperCase()) {
            const d20Button = document.querySelector('div[data-dice="d12"]');
            if (d20Button) {
                d20Button.click();
                setTimeout(() => {
                    const rollButtons = Array.from(document.querySelectorAll('button'));
                    const rollButton = rollButtons.find(button => button.textContent.includes('Roll'));
                    if (rollButton) {
                        rollButton.click();
                    }
                }, 500);
            }
        }

        if (event.key.toUpperCase() === items.clearShortcutKey.toUpperCase()) {
            const clearButton = document.querySelector('.dice_notification_control.dice_notification_controls__clear');
            if (clearButton) {
                clearButton.click();
                console.log('Clear button clicked.');
            } else {
                console.log('Clear button not found.');
            }
        }
    });
});

chrome.storage.local.get(['cssEnabled'], function(result) {
    if (result.hasOwnProperty('cssEnabled') && result.cssEnabled) {
        injectCustomCSS();
    } else {
        removeCustomCSS();
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggleCSS") {
        console.log('CSS Aktif Edildi Mi?', request.enable);
        if (request.enable) {
            injectCustomCSS();
        } else {
            removeCustomCSS();
        }
    }
});

function injectCustomCSS() {
    const cssFilePath = chrome.runtime.getURL('css/velutanStyle.css');
    const link = document.createElement('link');
    link.setAttribute('id', 'customInjectedCSS');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', cssFilePath);
    document.head.appendChild(link);
}

function removeCustomCSS() {
    const cssLink = document.getElementById('customInjectedCSS');
    if (cssLink) {
        cssLink.remove();
    }
}