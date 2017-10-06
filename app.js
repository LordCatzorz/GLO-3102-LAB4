import {ToDo} from "./modules/todo.js";

let myToDoList = new ToDo(document.getElementById("task-container"));

window.onload = function() {
    myToDoList.CreateNewUser();
}

window.createTask = function() {
    myToDoList.CreateTask()
}

window.modifyTask = function(sender) {
    if (sender.target.taskId != "") {
        myToDoList.ModifyTask(sender.target.taskId);
    }
}

window.deleteTask = function(sender) {
    if (sender.target.taskId != "") {
        myToDoList.DeleteTask(sender.target.taskId);
    }
}