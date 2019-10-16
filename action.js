function saveData() {
    localStorage.setItem("listsAndTasks", JSON.stringify(lists));
    // localStorage.setItem("users", JSON.stringify(users));
}

// var users = {};

// $("#new-account").click(function () {
//     let newUsername = $("#newUsername").val();
//     let newPassword = $("#newPassword").val();
//     let newColor = $("#newColor").val();
//     users.name = newUsername;
//     users.pass = newPassword;
//     users.color = newColor;
//     $("#newUsername").css("border-color", "#31D158");
//     $("#newPassword").css("border-color", "#31D158");
//     $("#newColor").css("border-color", "#31D158");
//     $("#success").html("Account Created!");
//     document.getElementById("newUsername").value = "";
//     document.getElementById("newPassword").value = "";
//     document.getElementById("newColor").value = "";
//     saveData();
// });

// $("#return-sign-in").click(function () {
//     $("#create-account-modal").hide();
//     $("#modal-container").show();
//     saveData();
// })

// $("#create-account").click(function () {
//     $("#modal-container").hide();
//     $("#create-account-modal").show();
// })

// let menu = 0;

// $("#show-sidebar").click(function () {
//     menu++;
//     if (menu % 2 == 1) {
//         $(".listItem").animate({
//             marginLeft: "-300"
//         }, 280);
//     } else if (menu % 2 == 0) {
//         $(".listItem").animate({
//             marginLeft: "0"
//         }, 210);
//     }
//     $("#container").animate({ width: 'toggle' }, 550);
// });

// function modal() {
//     $("#modal-container").show();

//     $("#sign-in").click(function () {
//         if ($("#username").val() == users.name && $("#password").val() == users.pass) {
//             $("#modal-container").fadeOut(200);
//             $("#user").html("Welcome Back " + users.name + "!");
//         } else {
//             $("#username").css("border-color", "rgb(255, 69, 58");
//             $("#password").css("border-color", "rgb(255, 69, 58");
//         }
//     })
// }

// $("#create-account").click(function () {
//     $("#modal-container").hide();
// })

$("#settings").click(() => {
    $("#settings-modal").show();
    $("#close").click(function () {
        $("#settings-modal").hide();
        if($("#nightMode").is(":checked")) {
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

// function getData(){
//     JSON.parse(localStorage.getItem("listsAndTasks"));
// }

var lists = [];
var selectedList = {};
var taskIndex = {};
var id = 0;

function itemReady() {
    // getData();
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
    saveData();
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
            saveData();
        })
    } else {
        alert("Select a list to edit");
    }
}

function renderTasks() {
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
    }
    document.getElementById("tasks").innerHTML = html;
    saveData();
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
    })
}

function clearCompleted(event) {
    for (let i = 0; i < lists[selectedList.id].tasks.length; i++) {
        if (lists[selectedList.id].completed[i] == true) {
            lists[selectedList.id].tasks.splice(i, 1);
            lists[selectedList.id].completed.splice(i, 1);
            renderTasks();
            saveData();
        }
    }
}
function check(event) {
    let thisHtml = event.target.parentNode.lastChild.previousSibling.innerHTML;
    let thisIndex = lists[selectedList.id].tasks.indexOf(thisHtml);
    lists[selectedList.id].completed[thisIndex] = true;
    renderTasks();
    saveData();
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
        saveData();
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
        saveData();
    }, 300)
}

document.getElementById("task-input").addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        addTask();
    }
})

var completedClicks = 0;

function addTask() {
    let taskInput = document.getElementById("task-input");
    if (selectedList.id >= 0) {
        if (taskInput.value.length > 0) {
            lists[selectedList.id].tasks.push(taskInput.value);
            lists[selectedList.id].completed.push(false);
            renderTasks();
            saveData();
        }
    }
    taskInput.value = "";
}