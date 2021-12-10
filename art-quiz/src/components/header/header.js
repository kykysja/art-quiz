import { HEADER } from '../../consts/tags';
import BaseComponent from '../base-component';

class Header extends BaseComponent {
  constructor() {
    super(HEADER, ['header']);

    this.element.innerHTML = `<div class="container"></div>`;
  }
}

export default Header;
