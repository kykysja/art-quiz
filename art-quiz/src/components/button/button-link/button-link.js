import BaseComponent from '../../base-component';

class BtnLink extends BaseComponent {
  constructor(href, textContent) {
    super('a', ['btn__link']);

    this.element.setAttribute('href', href);

    if (textContent)
      this.element.innerHTML = `<span class="btn__text-content">${textContent}</span>`;
  }
}

export default BtnLink;
