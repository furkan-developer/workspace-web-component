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
  const titleInput = document.getElementById("title");
  const title = titleInput.value;

  if (!title) {
    alert("Title is required");
  } else {
    fetch(`http://localhost:5067/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jobTitle: title }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.isSuccess) {
          const allStageComponents =
            document.querySelectorAll("stage-component");
          const backlogStage = [...allStageComponents].find(
            (stage) => stage.getAttribute("stage-title") === "backlog"
          );

          const task = document.createElement("task-component");
          task.setAttribute("task-title", result.data.jobTitle);
          backlogStage.append(task);

          titleInput.value = "";

          alert("The new task is successfully created");
        }
      })
      .catch((err) => console.log(err));
  }
});
