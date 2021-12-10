import State from '../../../state/state';
import BaseComponent from '../../../components/base-component';
import PictureInfo from '../../../components/picture-info/picture-info';
import timer from '../../../shared/timer/timer';
import EndQuizPopUp from '../../quiz/end-quiz-pop-up/end-quiz-pop-up';
import Btn from '../../../components/button/button';
import playAudio from '../../../shared/audio/audio';
import { closePopUp, renderPopUp } from '../../../shared/pop-up/pop-up';
import { DIV } from '../../../consts/tags';
import { NUMBER_OF_CORRECT_ANSWERS_TO_PASSED_QUIZ } from '../../../consts/base';

class AfterAnswerPopUp extends BaseComponent {
  constructor(categoryName, quizNum, question, result) {
    super(DIV, ['overlay']);

    this.categoryName = categoryName;
    this.quizNum = quizNum;
    this.question = question;
    this.result = result;
    this.questionsContainer = document.querySelector('.quiz__view .questions-container');

    this.pictureInfo = new PictureInfo(this.question);
    this.nextQuestionBtn = new Btn(['btn', '_colored'], 'Продолжить');
    this.answerResultIndicator = new BaseComponent(DIV, [
      'answer-icon',
      `${this.result}__answer-icon`,
    ]);

    this.element.innerHTML = `
      <div class="pop-up-view after-answer__pop-up"></div>
    `;

    this.pictureInfo.prependInto(this.element.querySelector('.after-answer__pop-up'));
    this.answerResultIndicator.appendInto(this.pictureInfo.element.querySelector('.image-wrap'));
    this.nextQuestionBtn.appendInto(this.element.querySelector('.after-answer__pop-up'));

    this.nextQuestionBtn.element.addEventListener(
      'click',
      this.handleNextQuestionBtnClick.bind(this)
    );
  }

  handleNextQuestionBtnClick() {
    closePopUp();

    const nextQuestion = this.questionsContainer.firstElementChild.nextElementSibling;

    if (nextQuestion) {
      this.showNextQuestion();
    } else {
      const numberOfCorrectAnswers = this.getNumberOfCorrectAnswers();

      playAudio(
        numberOfCorrectAnswers < NUMBER_OF_CORRECT_ANSWERS_TO_PASSED_QUIZ
          ? '../../../assets/audio/failure.mp3'
          : '../../../assets/audio/success.mp3'
      );

      this.showEndQuizPopUP(numberOfCorrectAnswers);
    }
  }

  getNumberOfCorrectAnswers() {
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

    return numberOfCorrectAnswers;
  }

  showEndQuizPopUP(numberOfCorrectAnswers) {
    renderPopUp(new EndQuizPopUp(this.categoryName, this.quizNum, numberOfCorrectAnswers));
  }

  showNextQuestion() {
    this.questionsContainer.removeChild(this.questionsContainer.firstChild);

    if (State.settings.timeGame) timer.start(State.settings.timeToAnswer, this.question);
  }
}

export default AfterAnswerPopUp;
