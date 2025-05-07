export function setupErrorCheck() {
    document.querySelector('form.formrun').addEventListener('submit', function (e) {
        setTimeout(() => {
            const errorElements = document.querySelectorAll('[data-formrun-show-if-error]:not(:empty)');
            let firstError = null;

            // エラーのある最初の要素を探す
            for (const el of errorElements) {
                if (el.textContent.trim() !== '') {
                    firstError = el;
                    break;
                }
            }

            if (firstError) {
                // エラーがある要素の親要素を探す
                const inputField = firstError.closest('.form-group, .form-group-input, .form-group-birth');
                if (inputField) {
                    // スクロール
                    inputField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    const focusable = inputField.querySelector('input, select, textarea');
                    if (focusable) {
                        // エラーのある入力フィールドにフォーカス
                        focusable.focus();
                    }
                }
            }
        }, 50); // DOM更新を待つために少し遅延
    });
}
