// checkboxHurdle.js

export function setupHurdleCheckboxes(containerId, errorId, inputName = "高校・高専での学びやその先の理系での進路/キャリアを描いていく上でハードルになっている／いたことを最大3つまでお選びください。ハードルがない場合は、「特にない」をお選びください。") {
    const container = document.getElementById(containerId);
    const errorElement = document.getElementById(errorId);

    const items = [
        "理系に進学するための学費が十分にないこと",
        "自分が何をやりたいのか将来像がまだ明確になっていないこと",
        "理数系科目の成績が伸び悩んでいること",
        "周囲に理系に進んだ先輩や進みたい同級生がおらず、情報が少ないこと",
        "親戚、家族などに理系や進みたい分野に進学することを反対されていること",
        "先生や知人、友人、先輩など親以外の第3者から理系以外の分野への進学を勧められていること",
        "居住地の地理的な環境（島嶼部、山間地など）で、何をするにも交通費がかかること",
        "就職先のイメージがわいておらず、理系に進むことに不安があること",
        "親が文系大学進学のためイメージがわきづらいこと",
        "親が大学進学していないためイメージがわきづらいこと"
    ];
    
    const otherItem = "ハードルは特にない";

    // Fisher–Yatesシャッフル
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }

    // チェックボックスを作成
    function createCheckbox(label, index) {
        const id = "hurdle" + (index + 1);
        const wrapper = document.createElement("div");
        wrapper.className = "checkbox-wrapper";

        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = id;
        input.name = inputName;
        input.value = label;

        const inputLabel = document.createElement("label");
        inputLabel.setAttribute("for", id);
        inputLabel.textContent = label;

        wrapper.appendChild(input);
        wrapper.appendChild(inputLabel);
        return wrapper;
    }

    // チェックボックスの追加
    items.forEach((item, idx) => {
        container.appendChild(createCheckbox(item, idx));
    });

    // その他を最後に追加
    container.appendChild(createCheckbox(otherItem, items.length));

    const form = document.querySelector("form");
    const checkboxes = Array.from(document.querySelectorAll(`input[name="${inputName}"]`));
    const otherCheckbox = checkboxes.find(cb => cb.value === otherItem);

    // チェック状態変更時の制御ロジック
    form.addEventListener("change", () => {
        const checked = checkboxes.filter(cb => cb.checked);
        const otherChecked = otherCheckbox.checked;

        checkboxes.forEach(cb => {
            if (otherChecked) {
                if (cb !== otherCheckbox) {
                    cb.checked = false;
                    cb.disabled = true;
                } else {
                    cb.disabled = false;
                }
            } else {
                if (cb !== otherCheckbox) {
                    cb.disabled = (checked.length >= 3 && !cb.checked);
                } else {
                    cb.disabled = (checked.length > 0);
                    if (cb.checked && checked.length > 1) {
                        cb.checked = false;
                    }
                }
            }
        });
    });

    // フォーム送信時のバリデーション
    form.addEventListener("submit", function (e) {
        const anyChecked = checkboxes.some(cb => cb.checked);
        if (!anyChecked) {
            e.preventDefault();
            errorElement.style.display = "block";
        } else {
            errorElement.style.display = "none";
        }
    });
}
