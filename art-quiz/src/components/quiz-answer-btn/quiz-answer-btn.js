import BaseComponent from '../base-component';

class QiuzAnswerBtn extends BaseComponent {
  constructor(categoryName, answer) {
    super('button', ['question__answer-btn', `${categoryName === 'artists' ? 'btn' : 'img-btn'}`]);

    this.element.setAttribute('type', 'button');

    this.categoryName = categoryName;
    this.answer = answer;

    this.element.innerHTML =
      this.categoryName === 'artists'
        ? `${this.answer}`
        : `
          <img class="img"
               src="https://raw.githubusercontent.com/kykysja/art-quiz-data/master/img/${this.answer}.jpg"
               alt="1" />
        `;

    this.element.addEventListener('click', () => this.handleAnswerBtnClick());
  }
}

export default QiuzAnswerBtn;
