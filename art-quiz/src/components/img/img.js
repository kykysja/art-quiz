import BaseComponent from '../base-component';

class Img extends BaseComponent {
  constructor(url, alt) {
    super('img', ['img']);

    this.element.setAttribute('alt', alt);

    this.url = url;
  }

  async load() {
    return new Promise((resolve, reject) => {
      this.element.src = this.url;

      this.element.onload = () => resolve(this);
      this.element.onerror = () => reject(new Error('Could not load image'));
    });
  }

  async render(parentElement) {
    await this.load();

    this.prependInto(parentElement);
  }
}

export default Img;
