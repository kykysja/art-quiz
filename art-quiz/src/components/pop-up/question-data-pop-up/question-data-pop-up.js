import BaseComponent from '../../base-component';
import QuestionData from '../../question-data/question-data';

class QuestionDataPopUp extends BaseComponent {
  constructor(question) {
    super('div', ['overlay']);

    this.question = question;

    this.questionData = new QuestionData(this.question);

    this.closeBtn = new BaseComponent('button', ['btn', 'btn_colored']);
    this.closeBtn.element.setAttribute('type', 'button');
    this.closeBtn.element.innerHTML = 'Закрыть';

    this.element.innerHTML = `
      <div class="pop-up-view question-data__pop-up"></div>
    `;

    this.questionData.prependInto(this.element.querySelector('.question-data__pop-up'));
    this.closeBtn.appendInto(this.element.querySelector('.question-data__pop-up'));
    this.closeBtn.element.addEventListener('click', this.closePopUp.bind(this));
  }

  closePopUp() {
    this.element.remove();
  }

  render() {
    this.prependInto(document.querySelector('#root'));
  }
}

export default QuestionDataPopUp;
