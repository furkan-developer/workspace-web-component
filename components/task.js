// creating autonomous custom element
class Task extends HTMLElement{
    constructor(){
        super();
    }

    // Called each time the element is added to document.
    connectedCallback(){
        // As far as possible, you should implement custom element setup in this callback rather than constructor.
        this.innerHTML = `<p>This is autonomous custom element</p>`;
    }
}

// Registering a custom element to make available in a page
customElements.define("task-component",Task);

export default Task;