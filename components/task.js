// creating autonomous custom element
class Task extends HTMLElement {
  constructor() {
    super();

    // Add Shadow DOM
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
        .task{
            border: 1px solid red;
            padding: 1rem 2rem;
            margin: 1rem;
            display: inline-block;
        }
        .task-title{
            text-transform: uppercase;
        }
        `;

    const taskTemplate = document.getElementById('task-component-template');

    this.addEventListener("click", function (e) {
      console.log("Web component");
    });

    this.shadowRoot.append(style);
    this.shadowRoot.append(taskTemplate.content.cloneNode(true));
  }

  // Called each time the element is added to document.
  connectedCallback() {
    // As far as possible, you should implement custom element setup in this callback rather than constructor.
    let titleText = 'Task Title';
    if (this.hasAttribute('task-title'))
      titleText = this.getAttribute('task-title');
    
    this.shadowRoot.querySelector('.task-title').textContent = titleText;
  }
}

// Registering a custom element to make available in a page
customElements.define("task-component", Task);

export default Task;
