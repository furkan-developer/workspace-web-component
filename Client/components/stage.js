class Stage extends HTMLElement {
  #shadowDom;
  #allowDrop = true;

  constructor() {
    super();
    this.#shadowDom = this.attachShadow({ mode: "open" });

    const style = document.createElement("link");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("href", "components/stage.css");

    const stageTemplate = document.createElement("div");
    stageTemplate.classList.add("stage");
    stageTemplate.innerHTML = `
            <div>
            <p class="stage-header">${
              !this.stageTitle ? "" : this.stageTitle
            }</p>
            </div>
            <slot><slot/>`;

    this.#shadowDom.append(style);
    this.#shadowDom.append(stageTemplate);

    this.dragenterHandler = this.dragenterHandler.bind(this);
    this.dragleaveHandler = this.dragleaveHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
  }

  connectedCallback() {
    if (this.hasAttribute("allow-drop"))
      this.#allowDrop = this.getAttribute("allow-drop");

    if (this.#allowDrop === true) this.obtainDroppableSkill();
  }

  get stageTitle() {
    if (this.hasAttribute("stage-title")) {
      let value = this.getAttribute("stage-title");
      let modifiedValue = value[0].toUpperCase() + value.slice(1);
      return modifiedValue;
    }

    return null;
  }

  obtainDroppableSkill() {
    const stageElement = this.#shadowDom.querySelector(".stage");
    stageElement.addEventListener("dragenter", this.dragenterHandler);
    stageElement.addEventListener("dragleave", this.dragleaveHandler);

    stageElement.addEventListener("drop", this.dropHandler);

    stageElement.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
  }

  dropHandler(e) {
    e.preventDefault();
    const allTaskComponent = document.querySelectorAll("task-component");
    for (const task of allTaskComponent) {
      if (task.draggable === true) {
        task.draggable = false;
        if (task.parentElement === this) break;

        this.append(task);

        const stageElement = this.#shadowDom.querySelector(".stage");

        if (stageElement.classList.contains("stage-dragenter")) {
          stageElement.classList.remove("stage-dragenter");
        }
        break;
      }
    }
  }

  dragenterHandler(e) {
    e.preventDefault();
    const allTaskComponent = document.querySelectorAll("task-component");
    for (const task of allTaskComponent) {
      if (task.draggable === true) {
        if (task.parentElement === this) break;

        this.#shadowDom
          .querySelector(".stage")
          .classList.add("stage-dragenter");

        break;
      }
    }
  }

  dragleaveHandler(e) {
    e.preventDefault();
    const stageElement = this.#shadowDom.querySelector(".stage");

    if (stageElement.classList.contains("stage-dragenter"))
      stageElement.classList.remove("stage-dragenter");
  }
}

customElements.define("stage-component", Stage);

export default Stage;
