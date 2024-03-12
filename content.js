// Kısayol Tuşlarını Ayarlama
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

// CSS Aktifleştirme 
chrome.storage.local.get(['cssEnabled'], function(result) {
    if (result.hasOwnProperty('cssEnabled') && result.cssEnabled) {
        injectCustomCSS();
    } else {
        removeCustomCSS();
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggleCSS") {
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
    applySavedStyle();
    console.log('CSS Aktif Edildi');
}

function removeCustomCSS() {
    const cssLink = document.getElementById('customInjectedCSS');
    const posStyle = document.getElementById('diceNotifyPosStyle');
    if (cssLink) {
        cssLink.remove();
    }
    if (posStyle) {
        posStyle.remove();
    }
}

// Zar Bildirim Ekranı Pozisyonunu Ayarlama
function applyCustomStyle(css) {
    const styleId = 'diceNotifyPosStyle';
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
    }

    styleElement.innerHTML = css;
}

function applySavedStyle() {
    const defaultValue = 1068;
    chrome.storage.local.get(['diceNotifyPosValue'], function(result) {
        const cssValue = result.diceNotifyPosValue || defaultValue;
        const css = `div.noty_layout {left: -${cssValue}px;}`;
        applyCustomStyle(css);
    });
}

applySavedStyle();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.inputValue !== undefined) {
        const css = `div.noty_layout {left: -${request.inputValue}px;}`;
        applyCustomStyle(css);
    }
});