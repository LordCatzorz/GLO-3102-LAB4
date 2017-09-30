export class ToDo {
    constructor (todoListParentElement) {
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

    InitialiseTask(user) {
        debugger;
        this.toDoList.innerHTML = "";
        document.getElementById("user-number").innerText = user;

    }
}