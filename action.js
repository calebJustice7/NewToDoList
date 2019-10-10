let users = {};

$("#new-account").click(function(){
        let newUsername = $("#newUsername").val();
        let newPassword = $("#newPassword").val();
        let newColor = $("#newColor").val();
        users.name = newUsername;
        users.pass = newPassword;
        users.color = newColor;
        $("#newUsername").css("border-color", "#31D158");
        $("#newPassword").css("border-color", "#31D158");
        $("#newColor").css("border-color", "#31D158");
        $("#success").html("Account Created!");
});

$("#return-sign-in").click(function(){
    $("#create-account-modal").hide();
    $("#modal-container").show();
})

$("#create-account").click(function(){
    $("#modal-container").hide();
    $("#create-account-modal").show();
})

let menu = 0;

$("#show-sidebar").click(function(){
    menu++;
    if(menu % 2 == 1) {
        $(".item").css("white-space", "nowrap");
    } else if(menu % 2 == 0) {
        $(".item").css("white-space", "normal");
    }
    $("#container").animate({width:'toggle'},550);
});

function modal() {
    $("#modal-container").show();

    $("#sign-in").click(function(){
            if($("#username").val() == users.name && $("#password").val() == users.pass) {
                $("#modal-container").hide();
                $("#user").html("Welcome Back " + users.name + "!");
            } else {
                $("#username").css("border-color", "rgb(255, 69, 58");
                $("#password").css("border-color", "rgb(255, 69, 58");
            }
    })
}

$("#create-account").click(function(){
    $("#modal-container").hide();
})

var lists = [];
var selectedList = {};
var id = 0;

$("#input").keyup(function(event){
    if(event.keyCode==13) {
        itemReady();
    }
})

$("#input-btn").click(function() {
    itemReady();
})

function itemReady(){ 
    var input = document.getElementById("input");
    if(!input.value) {
        document.getElementById("currentList").innerHTML = "Enter Value!";
    } else {
        document.getElementById("currentList").innerHTML = "";
        lists.push({
            name: input.value,
            iD: id,
            tasks: [],
            completed: []
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
            document.getElementById("currentList").innerHTML = x.innerHTML;
            renderTasks();
        })
    }


}

function renderLists(id){
    let html = `<div class="list-container">`;
    for(list in lists) {
        html += `<div class="listItem">
                    <i class="fas fa-trash-alt" onclick="deleteList(${lists[list].iD}, event)"></i>
                    <div class="item">${lists[list].name}</div>
                </div>`;
    }
    html += `</div>`;
    document.getElementById("lists").innerHTML = html;
}

function renderTasks() {
    var unchecked = "far fa-circle";
    var checked = "far fa-check-circle";
    let html = "<div>";
    for(tasks in lists[selectedList.id].tasks) {
        html += `<div class="text">
                    <i onclick="deleteTask(event)" class="fas fa-trash-alt"></i>
                    <i class="${lists[selectedList.id].completed[tasks]}" onclick="check(event)"></i>
                    <div>${lists[selectedList.id].tasks[tasks]}</div>
                </div>`;
    }
    html += `</div><button class="clearCompleted" onclick="clearCompleted(event)">Clear Completed Tasks</button>`;
    document.getElementById("tasks").innerHTML = html;
}

function clearCompleted(event){
    for(let i = 0; i < lists[selectedList.id].tasks.length; i++) {
        if(lists[selectedList.id].completed[i]=="far fa-check-circle") {
            lists[selectedList.id].tasks.splice(i, 1);
            lists[selectedList.id].completed.splice(i, 1);
            renderTasks();
        }
    }
}

function check(event){
    let thisHtml = event.target.parentNode.lastChild.previousSibling.innerHTML;
    let thisIndex = lists[selectedList.id].tasks.indexOf(thisHtml);
    lists[selectedList.id].completed[thisIndex] = "far fa-check-circle";
    renderTasks();
}

function deleteTask(event){
    var x = event.target.parentNode;
    $(x).animate({
        opacity: 0,
        marginLeft: "-300",
        marginBottom: "-40",

    }, 400, function(){
        let thisHtml = event.target.parentNode.lastChild.previousSibling.innerHTML;
        let thisIndex = lists[selectedList.id].tasks.indexOf(thisHtml);
        lists[selectedList.id].tasks.splice(thisIndex, 1);
        lists[selectedList.id].completed.splice(thisIndex, 1);
        renderTasks();
    });
}

function deleteList(id, event){
    let y = event.target.parentNode;
    $(y).animate({
        marginLeft: "-270",
        marginBottom: "-52"
    }, 100)
    setTimeout(function(){
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
    }, 300)
}

document.getElementById("task-input").addEventListener("keyup", function(event) {
    if(event.keyCode==13) {
        addTask();
    }
})

var completedClicks = 0;

function addTask() {
    let taskInput = document.getElementById("task-input");
    if(selectedList.id >= 0) {
        lists[selectedList.id].tasks.push(taskInput.value);
        lists[selectedList.id].completed.push("far fa-circle");
        renderTasks();
    }
    taskInput.value = "";
}