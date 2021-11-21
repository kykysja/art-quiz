import State from '../../../state/state';
import BaseComponent from '../../base-component';
import EndQuizPopUp from '../end-quiz-pop-up/end-quiz-pop-up';

class QuestionAnswerPopUp extends BaseComponent {
  constructor(categoryName, quizNum, question, result) {
    super('div', ['overlay']);

    this.categoryName = categoryName;
    this.quizNum = quizNum;
    this.question = question;
    this.result = result;

    this.nextQuizBtn = new BaseComponent('button', ['btn', 'btn_colored']);
    this.nextQuizBtn.element.setAttribute('type', 'button');
    this.nextQuizBtn.element.innerHTML = 'Продолжить';

    this.element.innerHTML = `
      <div class="pop-up-view question-answer__pop-up">
        <div class="image-wrap img-btn">
          <img class="img"
               src="https://raw.githubusercontent.com/kykysja/art-quiz-data/master/img/${this.question.imageNum}.jpg"
               alt="${this.question.imageNum}">
          <div class="answer-icon ${this.result}__answer-icon"></div>
        </div>
        <div class="picture-name">${this.question.name}</div>
        <div class="description">
          <span class="author">${this.question.author}</span>,
          <span class="year">${this.question.year}</span>
        </div>
      </div>
    `;

    this.nextQuizBtn.appendInto(this.element.querySelector('.question-answer__pop-up'));
    this.nextQuizBtn.element.addEventListener('click', this.showNextQuestion.bind(this));
  }

  showNextQuestion() {
    this.element.remove();

    const questionsContainer = document.querySelector('.quiz__view .questions-container');

    if (questionsContainer.firstElementChild.nextElementSibling) {
      questionsContainer.removeChild(questionsContainer.firstChild);
    } else {
      let numberOfCorrectAnswers = null;

      switch (this.categoryName) {
        case 'artists':
          numberOfCorrectAnswers =
            State.artists[this.quizNum - 1].gamesStatistic[
              State.artists[this.quizNum - 1].gamesStatistic.length - 1
            ].correctAnswers;
          break;

        case 'pictures':
          numberOfCorrectAnswers =
            State.pictures[this.quizNum - 1].gamesStatistic[
              State.pictures[this.quizNum - 1].gamesStatistic.length - 1
            ].correctAnswers;
          break;

        default:
      }

      new EndQuizPopUp(this.categoryName, this.quizNum, numberOfCorrectAnswers).render();
    }
  }

  render() {
    this.prependInto(document.querySelector('#root'));
  }
}

export default QuestionAnswerPopUp;
