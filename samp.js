const kanaList = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわ';
let schoolData = { high: {}, technical: {} };
let selectedPrefCode = "";
let selectedSchoolType = "high"; // 初期値は高等学校

const suggestionList = document.getElementById('suggestionList');
const codeInput = document.getElementById('schoolCode');
const kanaContainer = document.getElementById('kanaList');
const prefSelect = document.getElementById('prefSelect');
const schoolTypeSelect = document.getElementById('schoolTypeSelect');

// 初期状態では非表示
kanaContainer.style.display = 'none';
suggestionList.setAttribute('data-placeholder', '学校の種類と都道府県を選択してください。');

// fetch 成功後にイベントリスナーを追加
fetch('schools.json')
    .then(response => response.json())
    .then(data => {
        schoolData = data;
        schoolTypeSelect.addEventListener('change', onSchoolTypeChange); // 学校の種類変更時のイベント
        prefSelect.addEventListener('change', onPrefChange); // 都道府県変更時のイベント
    })
    .catch(error => console.error('学校データの読み込みに失敗しました:', error));

function onSchoolTypeChange() {
    selectedSchoolType = schoolTypeSelect.value;
    kanaContainer.style.display = 'none'; // ひらがなリストを非表示に
    codeInput.value = '';

    if (!selectedSchoolType && !prefSelect.value) {
        suggestionList.innerHTML = '';
        suggestionList.setAttribute('data-placeholder', '学校の種類と都道府県を選択してください。');
    } else if (!selectedSchoolType && prefSelect.value) {
        suggestionList.innerHTML = '';
        suggestionList.setAttribute('data-placeholder', '学校の種類を選択してください。');
    } else if (selectedSchoolType && !prefSelect.value) {
        suggestionList.innerHTML = '';
        suggestionList.setAttribute('data-placeholder', '都道府県を選択してください。');
    } else {
        suggestionList.innerHTML = '';
        suggestionList.setAttribute('data-placeholder', '学校名の頭文字を選択してください。');
    }
    

    if (selectedPrefCode && selectedSchoolType) {
        suggestionList.setAttribute('data-placeholder', '学校名の頭文字を選択してください。');

        // 学校データの取得とひらがなボタンの描画
        suggestionList.innerHTML = '';
        const kanaSet = new Set();
        const schoolList = schoolData[selectedSchoolType][selectedPrefCode] || [];

        schoolList
            .filter(s => s.kana)
            .forEach(s => kanaSet.add(s.kana.charAt(0)));

        if (kanaSet.size > 0) {
            kanaContainer.style.display = 'flex';
            renderKanaButtons([...kanaSet].sort());
        } else {
            kanaContainer.style.display = 'none';
        }
    }
}

function onPrefChange() {
    selectedPrefCode = prefSelect.value;
    kanaContainer.innerHTML = '';
    codeInput.value = '';

    if (!schoolTypeSelect.value && !selectedPrefCode) {
        suggestionList.innerHTML = '';
        suggestionList.setAttribute('data-placeholder', '学校の種類と都道府県を選択してください。');
        kanaContainer.style.display = 'none';
        return;
    }
    
    if (!schoolTypeSelect.value) {
        suggestionList.innerHTML = '';
        suggestionList.setAttribute('data-placeholder', '学校の種類を選択してください。');
        kanaContainer.style.display = 'none';
        return;
    }
    
    if (!selectedPrefCode) {
        suggestionList.innerHTML = '';
        suggestionList.setAttribute('data-placeholder', '都道府県を選択してください。');
        kanaContainer.style.display = 'none';
        return;
    }

    if (selectedPrefCode && selectedSchoolType) {
        suggestionList.setAttribute('data-placeholder', '学校名の頭文字を選択してください。');

        // 学校データの取得とひらがなボタンの描画
        suggestionList.innerHTML = '';
        const kanaSet = new Set();
        const schoolList = schoolData[selectedSchoolType][selectedPrefCode] || [];

        schoolList
            .filter(s => s.kana)
            .forEach(s => kanaSet.add(s.kana.charAt(0)));

        if (kanaSet.size > 0) {
            kanaContainer.style.display = 'flex';
            renderKanaButtons([...kanaSet].sort());
        } else {
            kanaContainer.style.display = 'none';
        }
    }
}


function renderKanaButtons(kanaArray) {
    kanaArray.forEach(kana => {
        const btn = document.createElement('button');
        btn.textContent = kana;
        btn.style.padding = '5px 10px';
        btn.style.border = '1px solid #ccc';
        btn.style.borderRadius = '5px';
        btn.style.background = '#f9f9f9';
        btn.style.cursor = 'pointer';
        btn.type = 'button';
        btn.addEventListener('click', () => {
            if (!selectedPrefCode) {
                alert('都道府県を選択してください');
                return;
            }
            showSuggestions(kana);
        });
        kanaContainer.appendChild(btn);
    });
}

function showSuggestions(kana) {
    suggestionList.innerHTML = '';
    suggestionList.removeAttribute('data-placeholder');

    const schoolList = schoolData[selectedSchoolType][selectedPrefCode] || [];

    const results = schoolList.filter(school =>
        school.kana &&
        school.kana.startsWith(kana)
    );

    suggestionList.setAttribute('data-placeholder', '所属する学校名を選択してください。');

    if (results.length === 0) {
        const li = document.createElement('li');
        li.textContent = '該当する学校がありません';
        li.style.padding = '5px';
        suggestionList.appendChild(li);
    } else {
        results.forEach(school => {
            const li = document.createElement('li');
            li.textContent = school.name;
            li.style.cursor = 'pointer';
            li.style.padding = '5px';
            li.style.listStyle = 'none';
            li.addEventListener('click', () => {
                codeInput.value = school.code;
                suggestionList.setAttribute('data-placeholder', '所属する学校名を選択してください。');
            });
            suggestionList.appendChild(li);
        });
    }
}

document.querySelectorAll('textarea').forEach(textarea => {
    const id = textarea.id;
    const counter = document.querySelector(`.charCount[data-for="${id}"]`);

    textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    counter.textContent = len;
    if (len > 200) {
        counter.classList.add('over');
    } else {
        counter.classList.remove('over');
    }
    });
});