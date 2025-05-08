// setParams.js

export function autofillEmailFromURL() {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    if (email) {
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.value = email;
        }
    }
}

export function autofillSecretIDFromURL() {
    const params = new URLSearchParams(window.location.search);
    const secretID = params.get('secretID');
    if (secretID) {
        const secretIDInput = document.getElementById('secretID');
        if (secretIDInput) {
            secretIDInput.value = email;
        }
    }
}