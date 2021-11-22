import BaseComponent from '../base-component';
import QuestionDataPopUp from '../pop-up/question-data-pop-up/question-data-pop-up';

class ScoreQuestionCard extends BaseComponent {
  constructor(question) {
    super('button', ['card-item', 'question-card', 'img-btn']);

    this.element.setAttribute('type', 'button');

    this.question = question;

    this.element.innerHTML = `
      <img class="img ${this.question.isCorrectAnswered ? 'passed' : null}"
           src="https://raw.githubusercontent.com/kykysja/art-quiz-data/master/img/${
             this.question.imageNum
           }.jpg"
           alt="${this.question.imageNum}" />
    `;

    this.element.addEventListener('click', () => new QuestionDataPopUp(this.question));
  }
}

export default ScoreQuestionCard;
