// errorHandler.js
import { validateHurdleCheckboxes } from './checkboxHurdle.js';
import { validateKikkakeCheckboxes } from './checkboxKikkake.js';

export function validateRequiredFields(event) {
    event.preventDefault();

    let isValid = true;
    document.querySelectorAll(".error-highlight").forEach(el => el.classList.remove("error-highlight"));

    const requiredFields = document.querySelectorAll("[data-formrun-required]");
    let firstErrorElement = null;

    requiredFields.forEach(field => {
        const isEmpty = !field.value || (field.type === "checkbox" && !field.checked);
        if (isEmpty) {
            if (!firstErrorElement) firstErrorElement = field;
            field.classList.add("error-highlight");

            const name = field.getAttribute("name");
            const errorEl = document.querySelector(`[data-formrun-show-if-error="${name}"]`);
            if (errorEl) errorEl.style.display = "block";
            isValid = false;
        }
    });

    if (!validateHurdleCheckboxes("checkbox-error-hurdle")) {
        isValid = false;
    }

    if (!validateKikkakeCheckboxes("checkbox-error-kikkake")) {
        isValid = false;
    }

    if (isValid) {
        event.target.closest("form").submit();  // バリデーションOKなら送信
    }
}
