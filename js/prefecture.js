// prefecture.js
export const prefectures_file = "data/schools2.json";
export let schoolDetailData = {};

export function populatePrefectures(data) {
    const prefectures = new Set();

    for (const category in data) {
        for (const pref in data[category]) {
            prefectures.add(pref);
        }
    }

    const select = document.getElementById("prefSelect");
    select.innerHTML = ""; // 念のため初期化

    // 都道府県の選択肢をソートして取得
    const sortedPrefectures = [...prefectures].sort();

    // プレースホルダーオプションを最初に追加
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "（任意）都道府県を選択";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    select.appendChild(placeholderOption);

    // 都道府県の選択肢を順に追加
    sortedPrefectures.forEach(pref => {
        const option = document.createElement("option");
        option.value = pref;
        option.textContent = pref;
        select.appendChild(option);
    });
}

