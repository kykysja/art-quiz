import BaseComponent from '../base-component';

class Btn extends BaseComponent {
  constructor(classes, textContent) {
    super('button');

    this.element.setAttribute('type', 'button');

    this.element.classList.add(...classes);

    if (textContent)
      this.element.innerHTML = `<span class="btn__text-content">${textContent}</span>`;
  }
}

export default Btn;
