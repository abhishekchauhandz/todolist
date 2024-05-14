
const taskBtn = document.getElementById("task-btn");
const taskForm = document.getElementById("task-form");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const addTask = document.getElementById("add-task");
const title = document.getElementById("title");
const date = document.getElementById("date");
const description = document.getElementById("description");
const tasksContainer = document.getElementById("tasks-container");

const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

const addOrUpdateTask = () => {
    
    const dataArrIndex = taskData.findIndex((item) => { item.id === currentTask.id });
    const taskObj = {
        id: title.value,
        title: title.value,
        date: date.value,
        description: description.value,
    };

    const existingTaskIndex = taskData.findIndex((item) => item.id === currentTask.id);

    if (existingTaskIndex !== -1) {
        
        taskData[existingTaskIndex] = taskObj;
    } else {
        
        taskData.unshift(taskObj);
    }                                       // If no matching task is found in taskData (dataArrIndex is -1),
    // add the new task (taskObj) to the beginning of the taskData array.
    localStorage.setItem("data", JSON.stringify(taskData));
    updateTaskContainer();
    reset();
}

const updateTaskContainer = () => {
    
    tasksContainer.innerHTML = "";

    taskData.forEach(({ id, title, date, description }) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add('task');
        taskElement.id = id;

        taskElement.innerHTML += `
           <h3>${title}</h3>
           <p><strong>ID: </strong>${id}</p>
           <p><strong>Date: </strong>${date}</p>
           <p><strong>Description: </strong>${description}</p>
           <button onclick="editTask(this)" type="button" class="btn">Edit</button>
           <button onclick="deleteTask(this)" type="button" class="btn">Delete</button>
        `
        tasksContainer.appendChild(taskElement);
    }
    );

};

const deleteTask = (buttonEl) => {
    const taskId = buttonEl.parentElement.id;
    const dataArrIndex = taskData.findIndex((item) => item.id === taskId);
    buttonEl.parentElement.remove();

    if (dataArrIndex !== -1) {
        
        taskData.splice(dataArrIndex, 1);
    } else {
        console.log("task not found with id:", taskId);
    }

    localStorage.setItem("data", JSON.stringify(taskData));
    updateTaskContainer();
};

const editTask = (buttonEl) => {
    
    const taskId = buttonEl.parentElement.id;
    const dataArrIndex = taskData.findIndex((item) => item.id === taskId);

    if (dataArrIndex !== -1) {
        currentTask = taskData[dataArrIndex];
    }

    title.value = currentTask.title;
    date.value = currentTask.date;
    description.value = currentTask.description;

    addTask.value = "Update Task";
    taskForm.classList.toggle("hidden");
    taskBtn.style.display = "none";
};


const reset = () => {
    addTask.value = "Add New Task";
    title.value = "";
    date.value = "";
    description.value = "";
    taskForm.classList.toggle("hidden");
    taskBtn.style.display = "block";
    currentTask = {};
}

if (taskData.length) {
    updateTaskContainer();
}

taskBtn.addEventListener("click", () => {
    taskForm.classList.toggle("hidden");
    taskBtn.style.display = "none";
});
closeTaskFormBtn.addEventListener("click", () => {
    const formInputsContainValues = title.value || date.value || description.value;
    const formInputsUpdateValues = title.value !== currentTask.title || date.value !== currentTask.date || description.value !== currentTask.description;
    if (formInputsContainValues && formInputsUpdateValues) {
        confirmCloseDialog.showModal();
    } else {
        reset();
    }
});
cancelBtn.addEventListener("clcik", () => {
    confirmCloseDialog.close();
});
discardBtn.addEventListener("click", () => {
    // confirmCloseDialog.close();
    // taskForm.classList.toggle("hidden");
    // taskBtn.style.display = 'block';
    reset();
});
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addOrUpdateTask();

});


