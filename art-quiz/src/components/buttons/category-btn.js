import BaseComponent from '../base-component';

class CategoryBtn extends BaseComponent {
  constructor(categoryName) {
    super('button', ['btn', 'category-btn']); //  ['btn', 'category-btn', 'animated-border']

    this.element.setAttribute('type', 'button');

    this.element.innerHTML = `<a class="category-btn__link" href="#${categoryName}">${
      categoryName === 'artists' ? 'художники' : 'картины'
    }</a>`;
  }
}

export default CategoryBtn;

// <div class="avd_div"><a href="#" class="bucn_4_4s">Кнопка</a></div>
