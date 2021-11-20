import BaseComponent from '../../base-component';

class EndQuizPopUp extends BaseComponent {
  constructor(numberOfCorrectAnswers) {
    super('div', ['pop-up-view', 'overlay']);

    if (numberOfCorrectAnswers < 5) {
      this.result = 'quiz-failed';
      this.resultText_1 = 'Game over';
      this.resultText_2 = 'Play again?';
      this.playBtnText = 'Yes';
    } else if (numberOfCorrectAnswers === 10) {
      this.result = 'grand-result';
      this.resultText_1 = 'Grand result';
      this.resultText_2 = 'Congratulations!';
      this.playBtnText = 'Next Quiz';
    } else {
      this.result = 'quiz-passed';
      this.resultText_1 = 'Congratulations!';
      this.resultText_2 = `${numberOfCorrectAnswers}/10`;
      this.playBtnText = 'Next Quiz';
    }

    this.homeBtn = new BaseComponent('button', ['btn']);
    this.homeBtn.element.setAttribute('type', 'button');
    this.homeBtn.element.textContent = 'Home';

    this.playBtn = new BaseComponent('button', ['btn', 'colored']);
    this.playBtn.element.setAttribute('type', 'button');
    this.playBtn.element.textContent = `${this.playBtnText}`;

    this.element.innerHTML = `
      <div class="end-quiz__pop-up">
        <div class="${this.result}__pop-up">
          <div class="result-image ${this.result}"></div>
          <div class="result-text">
            <span class="${this.result}">${this.resultText_1}</span>
            <span class="${this.result}">${this.resultText_2}</span>
          </div>
        </div>
      </div>
    `;

    this.homeBtn.appendInto(this.element.querySelector(`.${this.result}__pop-up`));
    this.playBtn.appendInto(this.element.querySelector(`.${this.result}__pop-up`));
  }

  render() {
    this.prependInto(document.querySelector('#root'));
  }
}

export default EndQuizPopUp;
