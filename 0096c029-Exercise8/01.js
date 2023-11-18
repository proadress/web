const inputIds = ['title', 'author', 'year', 'url'];
const display = document.getElementById("display");


loadSearches();

function loadSearches() {
    display.innerHTML = "";
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const title = document.createElement('tr');
    for (let i = 0; i < inputIds.length; i++) {
        const th = document.createElement('th');
        th.innerText = inputIds[i];
        title.appendChild(th);
    }
    thead.appendChild(title);
    table.appendChild(thead);
    let i = 0;
    getkeys().forEach(itemKey => {
        const tr = document.createElement('tr');
        if (i % 2 == 1)
            tr.className = "oddrow"
        const dict = JSON.parse(localStorage.getItem(itemKey));

        for (let key in dict) {
            const td = document.createElement("td");
            if (key == "url") {
                const a = document.createElement("a");
                a.href = dict[key];
                a.innerText = dict[key];
                td.appendChild(a);
            } else {
                td.innerText = dict[key];
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        // end for
        i++;
    });
    table.appendChild(tbody);
    display.appendChild(table);
} // end function loadSearches


document.getElementById("addButton").addEventListener("click", () => {
    let data = {};
    // 使用for循环遍历inputIds数组
    inputIds.forEach(inputId => {
        data[inputId] = document.getElementById(inputId).value;
    });
    localStorage.setItem("ntou-" + new Date().getTime(), JSON.stringify(data));
    loadSearches()
});


document.getElementById("removeAllButton").addEventListener("click", () => {
    console.log(localStorage.length);
    getkeys().forEach(key => {
        localStorage.removeItem(key);
    });
    display.innerHTML = "";
});

function getkeys() {
    let keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("ntou-"))
            keys.push(key);
    }
    return keys;
}