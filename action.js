var users = {};
var signedIn = {};
var rememberMe = {};

$("#new-account").click(function () {
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
    document.getElementById("newUsername").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("newColor").value = "";
    saveData();
});

$("#return-sign-in").click(function () {
    $("#create-account-modal").hide();
    $("#modal-container").show();
})

$("#create-account").click(function () {
    $("#modal-container").hide();
    $("#create-account-modal").show();
})

let menu = 0;

$("#show-sidebar").click(function () {
    menu++;
    if (menu % 2 == 1) {
        $(".listItem").animate({
            marginLeft: "-300"
        }, 280);
    } else if (menu % 2 == 0) {
        $(".listItem").animate({
            marginLeft: "0"
        }, 210);
    }
    $("#container").animate({ width: 'toggle' }, 550);
});

function modal() {
    $("#modal-container").show();

    if(localStorage.getItem("users") === null) {
        console.log("null");
    } else {
        users = JSON.parse(localStorage.getItem("users"));
        rememberMe = JSON.parse(localStorage.getItem("remember"));
    }
    $("#remember-me").click(function(){
        rememberMe.remember = true;
    })

    if(!jQuery.isEmptyObject(rememberMe)){
            document.getElementById("username").value = users.name;
    }

    document.getElementById("password").addEventListener("keyup", function(event){
        if(event.keyCode==13){

        }
    })

    $("#sign-in").click(function () {
        if ($("#username").val() == users.name && $("#password").val() == users.pass) {
            $("#modal-container").fadeOut(200);
            $("#user").html("Welcome Back " + users.name + "!");
            $("#username").css("border-color", "#31D158");
            $("#password").css("border-color", "#31D158");
            signedIn.logged = true;
            saveData();
        } else {
            $("#username").css("border-color", "rgb(255, 69, 58");
            $("#password").css("border-color", "rgb(255, 69, 58");
            signedIn.logged = false;
        }
    })
}

$("#sign-in-icon").click(function(){
    $("#modal-container").show();
    if(signedIn.logged==true) {
        $("#sign-out").show();
    } else {
        $("#sign-out").hide();
    }
})

$("#create-account").click(function () {
    $("#modal-container").hide();
})

$("#settings").click(() => {
    $("#settings-modal").show();
    $("#close").click(function () {
        $("#settings-modal").hide();
        if ($("#nightMode").is(":checked")) {
            $(".header").addClass("headerN");
            $("#input-btn").addClass("buttonN");
            $("#task-btn").addClass("buttonN");
            $("#input").addClass("inputN");
            $("#task-input").addClass("inputN");
            $(".clearCompleted").addClass("clearCompletedN");
            $(".heading").addClass("headingN");
            $(".side-bar").addClass("sideBarN");
            $(".task-container").addClass("task-containerN");
            $("#container").addClass("listItemN");
        } else {
            $(".header").removeClass("headerN");
            $("#input-btn").removeClass("buttonN");
            $("#task-btn").removeClass("buttonN");
            $("#input").removeClass("inputN");
            $("#task-input").removeClass("inputN");
            $(".clearCompleted").removeClass("clearCompletedN");
            $(".heading").removeClass("headingN");
            $(".side-bar").removeClass("sideBarN");
            $(".task-container").removeClass("task-containerN");
            $("#container").removeClass("listItemN");
        }
    })
})

$("#input").keyup(function (event) {
    if (event.keyCode == 13) {
        itemReady();
    }
})

$("#input-btn").click(function () {
    itemReady();
})

var lists = [];
var selectedList = {};
var taskIndex = {};
var id = 0;

if(localStorage.getItem("lists") === null) {
    console.log("null lists");
} else {
    console.log("not null lists");
    lists = JSON.parse(localStorage.getItem("lists"));
    renderLists();
    itemReady();

}

function saveData() {
    localStorage.setItem("remember", JSON.stringify(rememberMe));
    localStorage.setItem("users", JSON.stringify(users));
}
function saveLists(){
    localStorage.setItem("lists", JSON.stringify(lists));
}

function itemReady() {
    saveLists();
    var input = document.getElementById("input");
    if (!input.value) {
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

    for (let i = 0; i < document.getElementsByClassName("item").length; i++) {
        document.getElementsByClassName("item")[i].addEventListener("click", function (event) {
            var activeClass = document.getElementsByClassName("listItemActive");
            for (let j = 0; j < activeClass.length; j++) {
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

function renderLists(id) {
    saveLists();
    let html = `<div class="list-container">`;
    for (list in lists) {
        html += `<div class="listItem">
                    <i class="fas fa-trash-alt" onclick="deleteList(${lists[list].iD}, event)"></i>
                    <i class="fas fa-pencil-alt listPencil" onclick="editList(event)"></i>
                    <div class="item" contentEditable="false">${lists[list].name}</div>
                </div>`;
    }
    html += `</div>`;
    document.getElementById("lists").innerHTML = html;
}

function editList(event) {
    if (selectedList.id >= 0) {
        let x = event.target.nextSibling.nextSibling;
        x.classList.add("bgwhite");
        x.contentEditable = "true";
        event.target.classList.add("activePencil");
        $(".fa-pencil-alt").parent().css("cursor", "text");
        $("#edit-complete").slideDown(200);
        $("#edit-complete").click(function () {
            x.contentEditable = "false";
            $(".fa-pencil-alt").parent().css("cursor", "pointer");
            event.target.classList.remove("activePencil");
            $("#edit-complete").slideUp(200);
            x.classList.remove("bgwhite");
            lists[selectedList.id].name = x.innerHTML;
            renderLists();
            itemReady();
            saveLists();
        })
    } else {
        alert("Select a list to edit");
    }
}

function renderTasks() {
    saveLists();
    let html = "<div>";
    if (lists.length > 0) {
        lists[selectedList.id].tasks.forEach((task, index) => {
            let thisClass = lists[selectedList.id].completed[index] ? "far fa-check-circle" : "far fa-circle"
            html += `<div class="text">
                        <i onclick="deleteTask(event)" class="fas fa-trash-alt"></i>
                        <i class="fas fa-pencil-alt"></i>
                        <i class="${thisClass}" onclick="check(event)"></i>
                        <div contentEditable="false" onclick="editTask(event, ${index})">${lists[selectedList.id].tasks[index]}</div>
                    </div>`;
        });
        html += `</div>`;
        saveLists();
    }
    document.getElementById("tasks").innerHTML = html;

    for(let i = 0; i < document.getElementsByClassName("clearCompleted").length; i++){
        document.getElementsByClassName("clearCompleted")[i].addEventListener("click", function(){
            $(".fa-check-circle").parent().animate({
                opacity: 0,
                marginBottom: "-49"
            }, 300)
            for(let j = 0; j < lists[selectedList.id].completed.length; j++){
                setTimeout(function(){
                    if(lists[selectedList.id].completed[j] == true){
                        lists[selectedList.id].completed.splice(j, 1);
                        lists[selectedList.id].tasks.splice(j, 1);
                        renderTasks();
                    }
                }, 450)
            }
            saveLists();
        })
    }
}

function editTask(event, index) {
    let thisList = selectedList.id;
    let ind = index;
    taskIndex.task = event.target.innerHTML;
    let x = selectedList.tasks.indexOf(taskIndex.task);
    taskIndex.id = x;
    console.log(taskIndex);
    event.target.className = "bggray";
    event.target.contentEditable = "true";
    event.target.parentNode.firstChild.nextSibling.nextSibling.nextSibling.classList.add("activePencil");
    $("#edit-task-complete").slideDown(200);
    $("#edit-task-complete").click(function () {
        event.target.contentEditable = "false";
        event.target.classList.remove("bggray");
        selectedList.tasks[taskIndex.id] = event.target.innerHTML;
        event.target.parentNode.firstChild.nextSibling.nextSibling.nextSibling.classList.remove("activePencil");
        $("#edit-task-complete").slideUp(200);
        saveLists();
    })
}

function check(event) {
    let thisHtml = event.target.parentNode.lastChild.previousSibling.innerHTML;
    let thisIndex = lists[selectedList.id].tasks.indexOf(thisHtml);
    lists[selectedList.id].completed[thisIndex] = true;
    renderTasks();
    saveLists();
}

function deleteTask(event) {
    var x = event.target.parentNode;
    $(x).animate({
        opacity: 0,
        marginLeft: "-300",
        marginBottom: "-40",
    }, 400, function () {
        let thisHtml = event.target.parentNode.lastChild.previousSibling.innerHTML;
        let thisIndex = lists[selectedList.id].tasks.indexOf(thisHtml);
        lists[selectedList.id].tasks.splice(thisIndex, 1);
        lists[selectedList.id].completed.splice(thisIndex, 1);
        renderTasks();
        saveLists();
    });

    if (lists[selectedList.id].tasks.length == 1) {
        $("#edit-task-complete").slideUp(200)
    }
}

function deleteList(id, event) {
    let y = event.target.parentNode;
    $(y).animate({
        opacity: 0,
        marginBottom: "-52"
    }, 200)
    setTimeout(function () {
        for (i = 0; i < lists.length; i++) {
            if (id === lists[i].iD) {
                lists.splice(i, 1);
                selectedList.id = 0;
                selectedList.tasks = [];
            }
        }
        renderTasks();
        renderLists();
        itemReady();
        saveLists();
    }, 300)
}

document.getElementById("task-input").addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        addTask();
    }
})

document.getElementById("task-btn").addEventListener("click", function(){
    addTask();
})

var completedClicks = 0;

function addTask() {
    let taskInput = document.getElementById("task-input");
    if (selectedList.id >= 0) {
        if (taskInput.value.length > 0) {
            lists[selectedList.id].tasks.push(taskInput.value);
            lists[selectedList.id].completed.push(false);
            renderTasks();
        }
    }
    taskInput.value = "";
    saveLists();
}