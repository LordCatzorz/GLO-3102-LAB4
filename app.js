import {ToDo} from "./modules/todo.js";

let myToDoList = new ToDo(document.getElementById("task-container"));

window.onload = function() {
    myToDoList.CreateNewUser();
}