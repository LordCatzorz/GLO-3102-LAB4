import {Task} from "./task.js"

export class ToDo {
    constructor(todoListParentElement) {
        this.taskArray = [];
        this.toDoList = document.createElement("div");
        this.toDoList.classList.add("todo-list");
        todoListParentElement.appendChild(this.toDoList);
    }

    CreateNewUser() {
        let myRequest = new Request("https://glo3102lab4.herokuapp.com/users", {method: "POST"});
        fetch(myRequest).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            this.user = data["id"];
        }).then(() => {
            this.InitialiseTask(this.user);
        });
    }

    SetUser(user) {
        this.user = user;
        this.InitialiseTask(this.user);
    }

    GetUser() {
        return this.user;
    }

    UpdateTaskList() {
        this.toDoList.innerHTML = "";
        this.taskArray.forEach((element) => {
            this.toDoList.appendChild(element.ToHTML())
        })
    }

    InitialiseTask(user) {
        this.toDoList.innerHTML = "";
        document.getElementById("user-number").innerText = user;

    }

    CreateTask() {
        let newTaskName = prompt("What do you want to accomplish?", "Be a better cat");
        if (newTaskName !== null) {
            let newTask = new Task();
            newTask.name = newTaskName;
            let jsonTask = JSON.stringify(newTask);

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            let myRequest = new Request("https://glo3102lab4.herokuapp.com/" + this.user + "/tasks", {
                method: "POST",
                headers: headers,
                body: jsonTask
            });

            fetch(myRequest).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Task could not be added");
                }
            }).then((data) => {
                let addedTask = new Task();
                addedTask.id = data.id;
                addedTask.name = data.name;
                this.taskArray.push(addedTask);
                this.UpdateTaskList();
            })
        }
    }

    ModifyTask(id) {
        let task = this.taskArray.find((element) => {
            return element.id === id;
        });

        let newName = prompt("What do you REALLY want to accomplish?", task.name);

        if (newName !== null && newName != "") {

            let newTask = new Task();
            newTask.name = newName;
            newTask.id = task.id;
            let jsonTask = JSON.stringify(newTask);

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            let myRequest = new Request("https://glo3102lab4.herokuapp.com/" + this.user + "/tasks/" + task.id, {
                method: "PUT",
                headers: headers,
                body: jsonTask
            });

            fetch(myRequest).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Task could not be modified");
                }
            }).then((data) => {
                task.id = data.id;
                task.name = data.name;
                this.UpdateTaskList();
            })
        }
    }

    DeleteTask(id) {
        let task = this.taskArray.find((element) => {
            return element.id === id;
        });

        if (task != null) {
            let myRequest = new Request("https://glo3102lab4.herokuapp.com/" + this.user + "/tasks/" + task.id, {
                method: "DELETE"
            });

            fetch(myRequest).then((response) => {
                if (response.ok) {
                    this.taskArray.splice(this.taskArray.findIndex((element) => {
                        return element.id === id;
                    }), 1);
                    this.UpdateTaskList();
                } else {
                    alert("Task could not be Deleted");
                }
            })
        }
    }
}