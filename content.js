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
    console.log('CSS Aktif Edildi');
    positionDiceNotification();
}

function removeCustomCSS() {
    const cssLink = document.getElementById('customInjectedCSS');
    const diceNotifyPos = document.getElementById('diceNotificationPositionCSS');
    if (cssLink) {
        cssLink.remove();
    }
    if (diceNotifyPos) {
        diceNotifyPos.remove();
        console.log('CSS Devre Dışı');
    }
}


function positionDiceNotification()
{
    const windowWidth = window.innerWidth;
    const style = document.createElement('style');
    style.setAttribute('id', 'diceNotificationPositionCSS');
    if (windowWidth == 1920) {
        style.textContent = `div.noty_layout {left: -1068px;}`;
        console.log("1920 piksel için zar bilgisi ekranı sola kaydırıldı.");
        document.head.appendChild(style);
    }
    else if (windowWidth == 2560) {
        style.textContent = `div.noty_layout {left: -1518px;}`;
        console.log("2560 piksel için zar bilgisi ekranı sola kaydırıldı.");
        document.head.appendChild(style);
    }
    else
    {
        return;
    }
}