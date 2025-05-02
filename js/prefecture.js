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
    [...prefectures].sort().forEach(pref => {
        const option = document.createElement("option");
        option.value = pref;
        option.textContent = pref;
        select.appendChild(option);
    });
}
