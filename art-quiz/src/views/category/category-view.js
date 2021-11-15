import BaseComponent from '../../components/base-component';

class CategoryView extends BaseComponent {
  constructor(categoryName) {
    super('div', ['view', 'category__view']);

    this.element.innerHTML = `${categoryName} view`;
  }

  render() {
    document.querySelector('#root').innerHTML = '';
    this.appendInto(document.querySelector('#root'));
  }
}

export default CategoryView;
