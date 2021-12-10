import BaseComponent from '../../components/base-component';
import AfterAnswerPopUp from './after-answer-pop-up/after-answer-pop-up';
import AnswerBtn from './answer-btn/answer-btn';
import State from '../../state/state';
import timer from '../../shared/timer/timer';
import playAudio from '../../shared/audio/audio';
import Img from '../../components/img/img';
import { generateImageURL, getRandomNum, shuffle } from '../../helpers/helpers';
import { renderPopUp } from '../../shared/pop-up/pop-up';
import { DIV } from '../../consts/tags';
import { NUMBER_OF_TOTAL_DATA_ITEMS } from '../../consts/base';

const AFTER_ANSWER_POP_UP_SHOWING_DELAY = 600;

class QuestionView extends BaseComponent {
  constructor(categoryName, quizNum, question, questionIndex) {
    super(DIV, ['question-view', `${categoryName}__question-view`]);

    this.categoryName = categoryName;
    this.quizNum = quizNum;
    this.question = question;
    this.questionIndex = questionIndex;
    this.answers = this.generateAnswers();

    this.timerOutput = new BaseComponent(DIV, ['timer-output']);
    this.timerOutput.element.innerHTML = '-';

    this.element.innerHTML =
      this.categoryName === 'artists'
        ? `
          <div class="question-wrap">
            <div class="question__text">Кто автор этой картины?</div>
            <div class="question__image-wrap">
              <div class="loading">Load ...</div>
            </div>
            <div class="question__answers-container"></div>
          </div>
        `
        : `
          <div class="question-wrap">
            <div class="question__text">Какую из этих картин нарисовал ${this.question.author}?</div>
            <div class="question__answers-container"></div>
          </div>
        `;

    this.timerOutput.prependInto(this.element);

    if (this.categoryName === 'artists') this.renderImage();

    this.generateAnswerButtons();

    this.timerOutput.element.firstChild.addEventListener('DOMCharacterDataModified', (event) =>
      this.handleTimerOutputChange(event)
    );
  }

  handleTimerOutputChange(event) {
    if (event.newValue < 1) {
      timer.stop();

      switch (this.categoryName) {
        case 'artists':
          State.artists[this.quizNum - 1].questions[this.questionIndex].isCorrectAnswered = false;
          break;

        case 'pictures':
          State.pictures[this.quizNum - 1].questions[this.questionIndex].isCorrectAnswered = false;

          break;

        default:
      }

      renderPopUp(new AfterAnswerPopUp(this.categoryName, this.quizNum, this.question, 'wrong'));
    }
  }

  async renderImage() {
    const url = generateImageURL(this.question.imageNum);

    const img = new Img(url, 'image');

    await img.render(this.element.querySelector('.question__image-wrap'));

    this.element.querySelector('.loading').remove();
  }

  generateAnswers() {
    const answersSet = new Set();

    answersSet.add(this.categoryName === 'artists' ? this.question.author : this.question.imageNum);

    while (answersSet.size < 4) {
      const randomNum = getRandomNum(0, NUMBER_OF_TOTAL_DATA_ITEMS - 1);

      if (this.categoryName === 'artists') {
        answersSet.add(State.authors[randomNum]);
      } else if (
        this.categoryName === 'pictures' &&
        State.fullData[randomNum].author !== this.question.author
      ) {
        answersSet.add(randomNum);
      }
    }

    return shuffle(Array.from(answersSet));
  }

  showAfterAnswerPopUp(answerElement, result) {
    answerElement.classList.add(`${result}`);

    playAudio(`./assets/audio/${result}.mp3`);

    setTimeout(() => {
      renderPopUp(
        new AfterAnswerPopUp(this.categoryName, this.quizNum, this.question, `${result}`)
      );
    }, AFTER_ANSWER_POP_UP_SHOWING_DELAY);
  }

  handleAnswerBtnClick(answer) {
    timer.stop();

    this.element
      .querySelector('.question__answers-container')
      .querySelectorAll('.question__answer-btn')
      .forEach((btn) => btn.setAttribute('disabled', 'disabled'));

    switch (this.categoryName) {
      case 'artists':
        if (answer.element.textContent === this.question.author) {
          State.artists[this.quizNum - 1].questions[this.questionIndex].isCorrectAnswered = true;

          this.showAfterAnswerPopUp(answer.element, 'correct');
        } else {
          State.artists[this.quizNum - 1].questions[this.questionIndex].isCorrectAnswered = false;

          this.showAfterAnswerPopUp(answer.element, 'wrong');
        }
        break;

      case 'pictures':
        if (answer.answerData === this.question.imageNum) {
          State.pictures[this.quizNum - 1].questions[this.questionIndex].isCorrectAnswered = true;

          this.showAfterAnswerPopUp(answer.element, 'correct');
        } else {
          State.pictures[this.quizNum - 1].questions[this.questionIndex].isCorrectAnswered = false;

          this.showAfterAnswerPopUp(answer.element, 'wrong');
        }
        break;

      default:
    }
  }

  generateAnswerButtons() {
    for (let i = 0; i < this.answers.length; i += 1) {
      const answer = new AnswerBtn(this.categoryName, this.answers[i]);

      answer.appendInto(this.element.querySelector('.question__answers-container'));

      answer.element.addEventListener('click', () => this.handleAnswerBtnClick(answer));
    }
  }
}

export default QuestionView;
