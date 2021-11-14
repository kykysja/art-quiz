class BaseComponent {
  constructor(tag, classes) {
    this.element = document.createElement(tag);

    if (classes) this.element.classList.add(...classes);
  }

  appendInto(parentElem) {
    parentElem.append(this.element);
  }

  prependInto(parrentElem) {
    parrentElem.prepend(this.element);
  }
}

export default BaseComponent;
