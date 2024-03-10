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

function injectCustomCSS() {
    const link = document.createElement('link');
    link.href = chrome.runtime.getURL('styles/velutanStyle.css');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

injectCustomCSS();