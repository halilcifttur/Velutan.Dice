// Kısayol Tuşlarını Ayarlama

function saveOptions() {
    const d20ShortcutKey = document.getElementById('d20ShortcutKey').value;
    const d12ShortcutKey = document.getElementById('d12ShortcutKey').value;
    const clearShortcutKey = document.getElementById('clearShortcutKey').value;
    
    if (d20ShortcutKey === clearShortcutKey) {
        alert('d20 Zar Kısayol Tuşu ile Zar Bilgisi Temizleme Kısayol Tuşu aynı olamaz. Başka bir tuş atamayı deneyin.');
        return;
    }

    if (d20ShortcutKey === d12ShortcutKey) {
        alert('d20 Zar Kısayol Tuşu ile d12 Zar Kısayol Tuşu aynı olamaz. Başka bir tuş atamayı deneyin.');
        return; 
    }

    if (d12ShortcutKey === clearShortcutKey) {
        alert('d12 Zar Kısayol Tuşu ile Zar Bilgisi Temizleme Kısayol Tuşu aynı olamaz. Başka bir tuş atamayı deneyin.');
        return;
    }

    chrome.storage.sync.set({
        d20ShortcutKey: d20ShortcutKey,
        d12ShortcutKey: d12ShortcutKey,
        clearShortcutKey: clearShortcutKey
    }, function() {
        console.log('Ayarlar kaydedildi.');
        alert('Kısayol tuşları ayarlandı.');
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        d20ShortcutKey: 'R',
        d12ShortcutKey: 'D',
        clearShortcutKey: 'C'
    }, function(items) {
        document.getElementById('d20ShortcutKey').value = items.d20ShortcutKey;
        document.getElementById('d12ShortcutKey').value = items.d12ShortcutKey;
        document.getElementById('clearShortcutKey').value = items.clearShortcutKey;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

// CSS Aktifleştirme 
document.getElementById('toggleCSS').addEventListener('change', function() {
    const shouldEnableCSS = this.checked;
    chrome.storage.local.set({cssEnabled: shouldEnableCSS}, function() {
        console.log('CSS aktif edildi mi?', shouldEnableCSS);
    });
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "toggleCSS", enable: shouldEnableCSS});
    });
});

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['cssEnabled'], function(result) {
        if (result.hasOwnProperty('cssEnabled')) {
            document.getElementById('toggleCSS').checked = result.cssEnabled;
        }
    });
});

// Zar Bildirim Ekranı Pozisyonunu Ayarlama
document.addEventListener('DOMContentLoaded', function() {

    const diceNotifyPos = document.getElementById('diceNotifyPos');
    const defaultValue = 1068;

    chrome.storage.local.get(['diceNotifyPosValue'], function(result) {
        diceNotifyPos.value = result.diceNotifyPosValue || defaultValue;
        sendMessageToContent({inputValue: diceNotifyPos.value});
    });

    diceNotifyPos.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        const value = diceNotifyPos.value;
        if (value.length > 4) {
            this.value = value.slice(0, 4);
        }
        chrome.storage.local.set({diceNotifyPosValue: this.value});
        sendMessageToContent({inputValue: this.value});
    });

    function sendMessageToContent(message) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message);
        });
    }
});