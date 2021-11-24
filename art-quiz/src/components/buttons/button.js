import BaseComponent from '../base-component';

class Button extends BaseComponent {
  constructor(classes) {
    super('button');

    this.element.setAttribute('type', 'button');
    if (classes) this.element.classList.add(...classes);
  }
}

export default Button;
