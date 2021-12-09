import State from '../../../state/state';
import BaseComponent from '../../../components/base-component';
import BtnLink from '../../../components/button-link/button-link';

class EndQuizPopUp extends BaseComponent {
  constructor(categoryName, quizNum, numberOfCorrectAnswers) {
    super('div', ['overlay']);

    this.categoryName = categoryName;
    this.quizNum = quizNum;
    this.numberOFQuizzes =
      this.categoryName === 'artists' ? State.artists.length : State.pictures.length;

    if (numberOfCorrectAnswers < 5) {
      this.result = 'quiz-failed';
      this.resultText_1 = 'Конец игры';
      this.resultText_2 = 'Сыграть еще раз?';
      this.playBtnText = 'Играть';
      this.playBtnHref = `#${this.categoryName}/quiz/${this.quizNum}`;
    } else if (numberOfCorrectAnswers === 10) {
      this.result = 'grand-result';
      this.resultText_1 = 'Лучший результат';
      this.resultText_2 = 'Поздравляем!';
      this.playBtnText = 'Следующий раунд';
      this.playBtnHref = `#${this.categoryName}/quiz/${this.quizNum + 1}`;
    } else {
      this.result = 'quiz-passed';
      this.resultText_1 = 'Поздравляем!';
      this.resultText_2 = `${numberOfCorrectAnswers}/10`;
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
            <span class="text_1">${this.resultText_1}</span>
            <span class="text_2">${this.resultText_2}</span>
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

    // ? how to do more correctly ?

    if (numberOfCorrectAnswers < 5)
      this.playBtn.element.addEventListener('click', () => {
        window.location.hash = `${this.categoryName}`;
        window.location.hash = `${this.playBtnHref}`;
      });
  }
}

export default EndQuizPopUp;
