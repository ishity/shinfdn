// errorHandler.js

export function validateSelection(name = "ハードル[]", errorMessageId = "error-message") {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]`);
    const errorMessage = document.getElementById(errorMessageId);
    const isAnyChecked = Array.from(checkboxes).some(cb => cb.checked);

    if (!isAnyChecked) {
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
        alert("ありがとうございます。選択が確認されました。");
    }
}

export function validateRequiredFields(event) {
    const requiredFields = document.querySelectorAll('[data-formrun-required]');
    let firstInvalidField = null;

    requiredFields.forEach(field => {
        const container = field.closest('.form-group, .form-group-input') || field.parentElement;

        // スタイルリセット
        field.classList.remove('input-error');
        const existingError = container.querySelector('.validation-error');
        if (existingError) existingError.remove();

        if (!field.value.trim()) {
            if (!firstInvalidField) firstInvalidField = field;

            field.classList.add('input-error');

            const errorMsg = document.createElement('div');
            errorMsg.className = 'validation-error';
            errorMsg.textContent = 'この項目は必須です';
            errorMsg.style.color = '#d00';
            errorMsg.style.fontSize = '0.9em';
            errorMsg.style.marginTop = '4px';
            container.appendChild(errorMsg);
        }
    });

    if (firstInvalidField) {
        event.preventDefault();
        firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalidField.focus();
    }
}


