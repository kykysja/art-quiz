import BaseComponent from '../base-component';

class Header extends BaseComponent {
  constructor() {
    super('header', ['header']);

    this.element.innerHTML = `<div class="container"></div>`;
  }
}

export default Header;
