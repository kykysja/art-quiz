import { BUTTON } from '../../consts/tags';
import BaseComponent from '../base-component';

class Btn extends BaseComponent {
  constructor(classes, textContent) {
    super(BUTTON);

    this.element.setAttribute('type', BUTTON);

    this.element.classList.add(...classes);

    if (textContent) {
      this.element.innerHTML = `<span class="btn__text-content">${textContent}</span>`;
    }
  }
}

export default Btn;
