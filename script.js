function modal() {
    var modal = document.getElementById("modal-container");
    modal.style.display = "block";
    document.getElementById("close").addEventListener("click", function(){
        modal.style.display = "none";
    })
}

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
            tasks: [],
            completed: false
        });
        renderLists(id);
    }
    id++;

    input.value = "";

    for(let i = 0; i < document.getElementsByClassName("item").length; i++) {
        document.getElementsByClassName("item")[i].addEventListener("click", function(event){
            var activeClass = document.getElementsByClassName("listItemActive");
            for(let j = 0; j < activeClass.length; j++) {
                activeClass[j].classList.remove("listItemActive");
            }
            selectedList.id = i;
            selectedList.tasks = lists[selectedList.id].tasks;
            var x = event.target;
            x.parentNode.classList.add("listItemActive");
            renderTasks();
        })
    }
}

function renderLists(id){
    let html = `<div class="list-container">`;
    for(list in lists) {
        html += `<div class="listItem">
                    <i class="fas fa-trash-alt" onclick="deleteList(${lists[list].iD})"></i>
                    <div class="item">${lists[list].name}</div>
                </div>`;
    }
    html += `</div>`;
    document.getElementById("lists").innerHTML = html;
}

function renderTasks() {
    let html = "<div>";
    for(tasks in lists[selectedList.id].tasks) {
        html += `<div class="text">
                    <i onclick="deleteTask(event)" class="fas fa-trash-alt"></i>
                    <i class="far fa-circle"></i>
                    <div>${lists[selectedList.id].tasks[tasks]}</div>
                </div>`;
    }
    html += "</div>";
    document.getElementById("tasks").innerHTML = html;
}

function deleteTask(event){
    var thisHtml = event.target.parentNode.lastChild.previousSibling.innerHTML;
    var thisIndex = lists[selectedList.id].tasks.indexOf(thisHtml);
    lists[selectedList.id].tasks.splice(thisIndex, 1);
    renderTasks();
}

function deleteList(id){
    for(i = 0; i < lists.length; i++) {
        if(id === lists[i].iD) {
            lists.splice(i, 1);
            selectedList.id = 0;
        }
    }
    if(lists.length > 1) {
        renderTasks();
    }
    renderLists();
    itemReady();
}

document.getElementById("task-input").addEventListener("keyup", function(event) {
    if(event.keyCode==13) {
        addTask();
    }
})

var completedClicks = 0;

function addTask() {
    let taskInput = document.getElementById("task-input");
    lists[selectedList.id].tasks.push(taskInput.value);
    renderTasks();
    taskInput.value = "";
}