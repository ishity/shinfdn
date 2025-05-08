// setParams.js

export function autofillFromURL() {
    const params = new URLSearchParams(window.location.search);

    // email の取得と埋め込み
    const email = params.get('email');
    if (email) {
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.value = email;
        }
    }

    // プレエントリーID の取得と埋め込み
    const entryNumber = params.get('entry_number');
    if (entryNumber) {
        const secretInput = document.getElementById('secretID');
        if (secretInput) {
            secretInput.value = entryNumber;
        }
    }
}