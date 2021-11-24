import BaseComponent from '../base-component';

class CategoryBtn extends BaseComponent {
  constructor(categoryName) {
    super('button', ['btn', 'category-btn', 'animated-border']);

    this.element.setAttribute('type', 'button');

    this.element.innerHTML = `<a href="#${categoryName}">${
      categoryName === 'artists' ? 'художники' : 'картины'
    }</a>`;
  }
}

export default CategoryBtn;
