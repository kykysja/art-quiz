import BaseComponent from '../base-component';

class ExitQuizBtn extends BaseComponent {
  constructor() {
    super('button', ['exit-btn']);

    this.element.setAttribute('type', 'button');
  }
}

export default ExitQuizBtn;
