export class Task {

    constructor() {
        this.id = "";
        this.name = "";
    }

    ToHTML() {
        let html = document.createElement("div");
        let taskNameHtml = document.createElement("span");
        let changeButton = document.createElement("input");
        changeButton.type = "button";
        changeButton.value = "edit";
        changeButton.taskId = this.id;
        changeButton.onclick = modifyTask;
        html.appendChild(changeButton);

        let deleteButton = document.createElement("input");
        deleteButton.type = "button";
        deleteButton.value = "delete";
        deleteButton.taskId = this.id;
        deleteButton.onclick = deleteTask;
        html.appendChild(deleteButton);


        taskNameHtml.innerText = this.name;
        html.appendChild(taskNameHtml);

        return html;
    }
}