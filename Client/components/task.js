// creating autonomous custom element
class Task extends HTMLElement {
  constructor() {
    super();
    this.draggable = false;

    // Add Shadow DOM
    this.attachShadow({ mode: "open" });

    const style = document.createElement("link");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("href", "components/task.css");

    const taskTemplate = document.createElement("div");
    taskTemplate.classList.add("task");
    taskTemplate.setAttribute("draggable", "true");
    taskTemplate.innerHTML = `
          <p class="task-title">task title</p>
          <div class="task-footer">
            <svg
              id="delete"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"
              ></path>
            </svg>
          </div>`;

    this.shadowRoot.append(style);
    this.shadowRoot.append(taskTemplate);
    this.dragHandler = this.dragHandler.bind(this);
    this.dragendHandler = this.dragendHandler.bind(this);
  }

  // Called each time the element is added to document.
  connectedCallback() {
    // As far as possible, you should implement custom element setup in this callback rather than constructor.
    let titleText = "Task Title";
    if (this.hasAttribute("task-title"))
      titleText = this.getAttribute("task-title");

    this.shadowRoot.querySelector(".task-title").textContent = titleText;

    const deleteTaskButton = this.shadowRoot.getElementById("delete");
    deleteTaskButton.addEventListener("click", function (e) {
      alert("Delete Task");
    });

    const taskElement = this.shadowRoot.querySelector(".task");
    taskElement.addEventListener("drag", this.dragHandler);
    taskElement.addEventListener("dragend", this.dragendHandler);
  }

  dragHandler(e) {
    this.draggable = true;
  }

  dragendHandler(e) {
    if (this.draggable === true) this.draggable = false;
  }
}

// Registering a custom element to make available in a page
customElements.define("task-component", Task);

export default Task;
