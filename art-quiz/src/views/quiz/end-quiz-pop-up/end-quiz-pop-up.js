import State from '../../../state/state';
import BaseComponent from '../../../components/base-component';
import BtnLink from '../../../components/button-link/button-link';
import { DIV } from '../../../consts/tags';
import {
  NUMBER_OF_CORRECT_ANSWERS_TO_PASSED_QUIZ,
  NUMBER_OF_QUIZ_QUESTIONS,
} from '../../../consts/base';

class EndQuizPopUp extends BaseComponent {
  constructor(categoryName, quizNum, numberOfCorrectAnswers) {
    super(DIV, ['overlay']);

    this.categoryName = categoryName;
    this.quizNum = quizNum;
    this.numberOFQuizzes =
      this.categoryName === 'artists' ? State.artists.length : State.pictures.length;

    if (numberOfCorrectAnswers < NUMBER_OF_CORRECT_ANSWERS_TO_PASSED_QUIZ) {
      this.result = 'failed';
      this.endQuizText = 'Конец игры';
      this.resultText = 'Сыграть еще раз?';
      this.playBtnText = 'Играть';
      this.playBtnHref = `#${this.categoryName}/quiz/${this.quizNum}`;
    } else if (numberOfCorrectAnswers === NUMBER_OF_QUIZ_QUESTIONS) {
      this.result = 'grand';
      this.endQuizText = 'Лучший результат';
      this.resultText = 'Поздравляем!';
      this.playBtnText = 'Следующий раунд';
      this.playBtnHref = `#${this.categoryName}/quiz/${this.quizNum + 1}`;
    } else {
      this.result = 'passed';
      this.endQuizText = 'Поздравляем!';
      this.resultText = `${numberOfCorrectAnswers}/10`;
      this.playBtnText = 'Следующий раунд';
      this.playBtnHref = `#${this.categoryName}/quiz/${this.quizNum + 1}`;
    }

    this.closeBtn = new BtnLink(`#${this.categoryName}`, ['icon-btn', 'exit-btn', 'exit-btn_dark']);
    this.homeBtn = new BtnLink('#', ['btn', 'btn_dark'], 'Главная');
    this.playBtn = new BtnLink(
      `${this.playBtnHref}`,
      ['btn', 'btn_colored'],
      `${this.playBtnText}`
    );

    this.element.innerHTML = `
      <div class="pop-up-view end-quiz__pop-up">
        <div class="pop-up-wrap ${this.result}__pop-up">
          <div class="result-image"></div>
          <div class="result-text">
            <span class="end-quiz-text">${this.endQuizText}</span>
            <span class="result-message">${this.resultText}</span>
          </div>
          <div class="buttons-container"></div>
        </div>
      </div>
    `;

    this.closeBtn.prependInto(this.element.querySelector('.pop-up-wrap'));
    this.homeBtn.appendInto(this.element.querySelector('.buttons-container'));

    if (this.quizNum < this.numberOFQuizzes) {
      this.playBtn.appendInto(this.element.querySelector('.buttons-container'));
    } else {
      this.element.querySelector('.buttons-container').classList.add('centered');
    }

    if (numberOfCorrectAnswers < NUMBER_OF_CORRECT_ANSWERS_TO_PASSED_QUIZ)
      this.playBtn.element.addEventListener('click', () => {
        window.location.hash = `${this.categoryName}`;
        window.location.hash = `${this.playBtnHref}`;
      });
  }
}

export default EndQuizPopUp;
