import State from '../../../state/state';
import BaseComponent from '../../base-component';
import QuestionData from '../../question-data/question-data';
import EndQuizPopUp from '../end-quiz-pop-up/end-quiz-pop-up';

class QuestionAnswerPopUp extends BaseComponent {
  constructor(categoryName, quizNum, question, result) {
    super('div', ['overlay']);

    this.categoryName = categoryName;
    this.quizNum = quizNum;
    this.question = question;
    this.result = result;

    this.questionData = new QuestionData(this.question);
    this.answerResultIndicator = new BaseComponent('div', [
      'answer-icon',
      `${this.result}__answer-icon`,
    ]);

    this.nextQuizBtn = new BaseComponent('button', ['btn', 'btn_colored']);
    this.nextQuizBtn.element.setAttribute('type', 'button');
    this.nextQuizBtn.element.innerHTML = 'Продолжить';

    this.element.innerHTML = `
      <div class="pop-up-view question-answer__pop-up"></div>
    `;

    this.questionData.prependInto(this.element.querySelector('.question-answer__pop-up'));
    this.answerResultIndicator.appendInto(this.questionData.element.querySelector('.image-wrap'));
    this.nextQuizBtn.appendInto(this.element.querySelector('.question-answer__pop-up'));
    this.nextQuizBtn.element.addEventListener('click', this.showNextQuestion.bind(this));
  }

  showNextQuestion() {
    this.element.remove();

    const questionsContainer = document.querySelector('.quiz__view .questions-container');

    if (questionsContainer.firstElementChild.nextElementSibling) {
      questionsContainer.removeChild(questionsContainer.firstChild);
    } else {
      let numberOfCorrectAnswers = 0;

      switch (this.categoryName) {
        case 'artists':
          numberOfCorrectAnswers = State.artists[this.quizNum - 1].questions.filter(
            (question) => question.isCorrectAnswered
          ).length;
          break;

        case 'pictures':
          numberOfCorrectAnswers = State.pictures[this.quizNum - 1].questions.filter(
            (question) => question.isCorrectAnswered
          ).length;
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
