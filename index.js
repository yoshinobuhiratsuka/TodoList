const form = document.getElementById("form");
const txt = document.getElementById("txt");
const ul = document.getElementById("ul");

//リロード時にローカルストレージよりデータ取得
const todos = JSON.parse(localStorage.getItem("todos"));
if (todos) {
    todos.forEach(todo => {
        add(todo);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(txt.value);
    add();
});

function add(todo) {
    let todoText = txt.value;
    if (todo) {
        todoText = todo.text;
    }
    
    //if (todoText.length > 0) {
    if (todoText) { //暗黙的型変換（false: 空文字,nullなど）
        const li = document.createElement("li");
        li.innerText = todoText;
        li.classList.add("List-group-item");
        //リロード対策（完了時には取引線を付ける）
        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }
        //appendChild前に削除イベント付加
        li.addEventListener("contextmenu", function(event){
            event.preventDefault;
            li.remove();
            saveData();
        });
        //appendChile前に取り消し線イベント付加
        li.addEventListener("click", function(event){
            li.classList.toggle("text-decoration-line-through");
            saveData();
        });

        ul.appendChild(li);
        txt.value = "";
        saveData();
    }

    function saveData() {
        const lists = document.querySelectorAll("Li");
        //console.log(lists);
        let todos = [];

        lists.forEach(list => {
            let todo = {
                text: list.innerText,
                //containsはそのクラスを持っている場合true
                completed: list.classList.contains("text-decoration-line-through")
            };
            todos.push(todo);
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}