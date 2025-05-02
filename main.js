import { prefectures_file, populatePrefectures } from './js/prefecture.js';
import { setupCharCounter } from './js/charCount.js';
import { setupCheckboxLimit, validateSelection } from './js/checkboxHandler.js';
import { setupKikkakeCheckboxes } from './js/checkboxKikkake.js';

//////////////////
// fetch prefecture from the data
fetch(prefectures_file)
    .then(response => response.json())
    .then(data => {
        populatePrefectures(data);
    })
    .catch(error => console.error('都道府県の取得に失敗しました:', error));


//////////////////
// setup the char counter
document.addEventListener('DOMContentLoaded', () => {
    setupCharCounter();
});


//////////////////
// setup the hurdle checkbox limit and validation
window.addEventListener('DOMContentLoaded', () => {
    setupCheckboxLimit('checkbox-container-hurdle');

    // 例: ボタンがクリックされたときに validateSelection を実行
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            validateSelection();
        });
    }
});


//////////////////
// setup the kikkake checkbox limit and validation
window.addEventListener('DOMContentLoaded', () => {
    setupKikkakeCheckboxes('checkbox-container-kikkake', 'checkbox-error');
});