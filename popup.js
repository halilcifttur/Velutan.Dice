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
        console.log('Options saved.');
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