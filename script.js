var lists = {};
var selectedList = {};
var id = 0;

document.getElementById("input").addEventListener("keyup", function(event){
    if(event.keyCode==13) {
        itemReady();
    }
})

document.getElementById("input-btn").addEventListener("click", function() {
    itemReady();
})

function itemReady(){
    var input = document.getElementById("input");
    if(!input.value) {
        alert("Must Enter Something");
    } else {
        lists[id] = {};
        lists[id].name = input.value;
        lists[id].iD = id;
        lists[id].tasks = [];
        renderLists(id);
    }
    id++;

    for(let i = 0; i < document.getElementsByClassName("item").length; i++) {
        document.getElementsByClassName("item")[i].addEventListener("click", function(){
            selectedList.id = i;
            selectedList.tasks = lists[i].tasks;
            console.log(selectedList);
            renderTasks();
        })
    }
}

function renderLists(id){
    let html = "<div>";
    for(list in lists) {
        html += `<div class="listItem">
                    <i class="fas fa-trash-alt" onclick="deleteList(${lists[list].iD})"></i>
                    <div class="item">${lists[list].name}</div>
                </div>`;
    }
    html += "</div>";
    document.getElementById("lists").innerHTML = html;
}

function renderTasks() {
    let tasksList = selectedList.tasks;
    let html = "<div>";
    for(tasks in tasksList) {
        html += `<div class="text">
                    <div>${tasksList[tasks]}</div>
                </div>`;
    }
    html += "</div>";
    document.getElementById("tasks").innerHTML = html;
}

function deleteList(id){
    delete lists[id];
    console.log(id);
    renderLists();
}

document.getElementById("task-input").addEventListener("keyup", function(event) {
    if(event.keyCode==13) {
        addTask();
    }
})

function addTask() {
    let taskInput = document.getElementById("task-input").value;
    lists[selectedList.id].tasks.push(taskInput);
    console.log(lists);
    renderTasks();
}