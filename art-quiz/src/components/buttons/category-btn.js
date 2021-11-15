import BaseComponent from '../base-component';

class CategoryBtn extends BaseComponent {
  constructor(categoryName) {
    super('button', ['btn', 'category-btn']);

    this.element.setAttribute('type', 'button');

    this.element.innerHTML = `<a href="#${categoryName}">${categoryName} Quiz</a>`;
  }
}

export default CategoryBtn;
