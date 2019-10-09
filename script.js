var lists = [];
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
        lists.push({
            name: input.value,
            iD: id,
            tasks: []
        });
        renderLists(id);
    }
    id++;

    for(let i = 0; i < document.getElementsByClassName("item").length; i++) {
        document.getElementsByClassName("item")[i].addEventListener("click", function(){
            selectedList.id = i;
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
    let tasksList = lists[selectedList.id].tasks;
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
    for(i = 0; i < lists.length; i++) {
        if(id === lists[i].iD) {
            lists.splice(i, 1);
            selectedList.id = 0;
        }
    }
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
    renderTasks();
}