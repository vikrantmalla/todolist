let myform = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textarea");
let task = document.getElementById('tasks');
let add = document.getElementById("add");


myform.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();

})

let formValidation = () => {

    if (textInput.value === "") {
        document.getElementById('msg').innerHTML = "Task can't be Blank";
    } else {
        document.getElementById('msg').innerHTML = "";
        acceptData();
        // targting add button to closed model after filling form.
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        // it will not allow closed model action without filling form.
        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
}

// ACCEPT DATA fun enter in form.
let data = {}
    // accept that text, date, desc Values in array.
let acceptData = () => {
    data["text"] = textInput.value;
    data["date"] = dateInput.value;
    data["description"] = textArea.value;
    // console.log(data);
    createTask();
    resetForm();

}

// CREATE TASK fun + template
let createTask = () => {
    task.innerHTML += `
            <div class="task mb-2 p-4 rounded-3">
                <p>${data.text}</p>
                <p>${data.date}</p>
                <p>${data.description}</p>
                <span class="options d-flex flex-row justify-content-center align-items-center gap-2">
                        <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                        <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
                </span>
            </div>
    `
}


// DELETE fun
let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
}

// EDIT fun
let editTask = (e) => {
    // selecting text[0], date[1], desc[3] Values 
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textArea.value = selectedTask.children[2].innerHTML;

    // after editing it will removed selected task onclick add btn
    add.addEventListener("click", (e) => {
        selectedTask.remove();
    })

}

// RESET fun
let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textArea.value = "";
}