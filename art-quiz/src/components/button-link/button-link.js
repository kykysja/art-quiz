import BaseComponent from '../base-component';

class BtnLink extends BaseComponent {
  constructor(href, classes, textContent) {
    super('a', ['btn-link']);

    this.element.setAttribute('href', href);

    this.element.classList.add(...classes);

    if (textContent)
      this.element.innerHTML = `<span class="btn__text-content">${textContent}</span>`;
  }
}

export default BtnLink;
