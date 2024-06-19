import task from "./components/task.js";
import stage from "./components/stage.js";

let createTaskDialog = document.getElementById(`create-one-task-dialog`);
let createTaskBtn = document.getElementById("create-task-button");
let createTaskDialogCloseBtn = document.getElementById(
  "create-task-dialog-close-btn"
);
let createTaskDialogCreateBtn = document.getElementById(
  "create-task-dialog-create-button"
);

createTaskBtn.addEventListener("click", function (e) {
  createTaskDialog.showModal();
});
createTaskDialogCloseBtn.addEventListener("click", () => {
  createTaskDialog.close();
});
createTaskDialogCreateBtn.addEventListener("click", () => {
    console.log('task will send to server for creating it');
});
