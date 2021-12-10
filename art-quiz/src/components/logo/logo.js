import { LINK } from '../../consts/tags';
import BaseComponent from '../base-component';

class Logo extends BaseComponent {
  constructor() {
    super(LINK, ['logo']);

    this.element.setAttribute('href', '#');

    this.element.innerHTML = `
      <span class="logo__text">Art</span>
      <span class="logo__text">Quiz</span>
    `;
  }
}

export default Logo;
