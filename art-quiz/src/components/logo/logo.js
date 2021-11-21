import BaseComponent from '../base-component';

class Logo extends BaseComponent {
  constructor() {
    super('a', ['logo']);

    this.element.setAttribute('href', '#');

    this.element.innerHTML = `
      <span class="logo__text">Art</span>
      <span class="logo__text">Quiz</span>
    `;
  }
}

export default Logo;
