const inputIds = ['title', 'author', 'year', 'url'];

loadSearches();

function loadSearches() {
    const display = document.getElementById("display");
    display.innerHTML = "";
    if (localStorage.length == 0) return;
    let tags = {}; // 创建一个空的对象

    // 获取所有键并存储到字典中
    for (let i = 0; i < localStorage.length; ++i) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        tags[key] = value;
    } // end for

    

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


    // build list of links
    for (let tag in tags) {
        const tr = document.createElement('tr');
        tr.className = "oddrow"
        const dict = JSON.parse(tags[tag]);
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
    } // end for
    table.appendChild(tbody);
    display.appendChild(table);
} // end function loadSearches


document.getElementById("addButton").addEventListener("click", () => {
    let data = {};

    // 使用for循环遍历inputIds数组
    for (var i = 0; i < inputIds.length; i++) {
        var inputId = inputIds[i];
        var inputValue = document.getElementById(inputId).value;
        data[inputId] = inputValue;
    }
    let item = {};
    const jsondata = JSON.stringify(data);
    const key = "ntou-" + new Date().getTime();
    item[key] = jsondata;
    localStorage.setItem(key, jsondata);
    loadSearches()
});


document.getElementById("removeAllButton").addEventListener("click", () => {
    console.log(localStorage.length);
    let del = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("ntou-"))
            del.push(key);
    } // end for
    for (let i = 0; i < del.length; i++) {
        localStorage.removeItem(del[i]);
    }
    loadSearches(); // reload searches
});