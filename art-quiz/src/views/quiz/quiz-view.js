import BaseComponent from '../../components/base-component';
class QuizView extends BaseComponent {
  constructor(categoryName, quiz) {
    super('div', ['view', 'quiz__view']);

    this.element.innerHTML = `
      Quiz View
    `;
  }

  render() {
    document.querySelector('#root').innerHTML = '';
    this.appendInto(document.querySelector('#root'));
  }
}

export default QuizView;
