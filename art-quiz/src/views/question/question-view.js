import BaseComponent from '../../components/base-component';
import QuestionAnswerPopUp from '../../components/pop-up/question-answer-pop-up/question-answer-pop-up';
import QiuzAnswerBtn from '../../components/quiz-answer-btn/quiz-answer-btn';
import State from '../../state/state';
import { getRandomNum, shuffle } from '../../helpers/helpers';
import { getImage } from '../../api/data';
import timer from '../../components/timer/timer';

class QuestionView extends BaseComponent {
  constructor(categoryName, quizNum, question, questionIndex) {
    super('div', ['question-view', `${categoryName}__question-view`]);

    this.categoryName = categoryName;
    this.quizNum = quizNum;
    this.question = question;
    this.questionIndex = questionIndex;

    this.timer = new BaseComponent('div', ['timer-output']);
    this.timer.element.innerHTML = `
      <div class="seconds">-</div>
    `;

    this.answers = this.categoryName === 'artists' ? this.getAuthors() : this.getImagesNums();

    this.element.innerHTML =
      this.categoryName === 'artists'
        ? `
          <div class="question-wrap">
            <div class="question__text">Кто автор этой картины?</div>
            <div class="question__image-wrap">Load ...</div>
            <div class="question__answers-container"></div>
          </div>
        `
        : `
          <div class="question-wrap">
            <div class="question__text">Какую из этих картин нарисовал ${this.question.author}?</div>
            <div class="question__answers-container"></div>
          </div>
        `;

    if (this.categoryName === 'artists')
      this.createImage(
        `https://raw.githubusercontent.com/kykysja/art-quiz-data/master/img/${this.question.imageNum}.jpg`
      );

    this.timer.prependInto(this.element);

    this.generateAnswers();

    this.timer.element.querySelector('.seconds').firstChild.addEventListener(
      'DOMCharacterDataModified',
      (event) => {
        if (event.newValue < 1) {
          timer.stop();

          switch (this.categoryName) {
            case 'artists':
              State.artists[this.quizNum - 1].questions[
                this.questionIndex
              ].isCorrectAnswered = false;
              break;

            case 'pictures':
              State.pictures[this.quizNum - 1].questions[
                this.questionIndex
              ].isCorrectAnswered = false;

              break;

            default:
          }

          new QuestionAnswerPopUp(this.categoryName, this.quizNum, this.question, 'wrong').render();
        }
      },
      false
    );
  }

  async createImage(url) {
    const img = await getImage(url);

    img.classList.add('img');
    img.setAttribute('alt', 'image');

    this.element.querySelector('.question__image-wrap').innerHTML = '';
    this.element.querySelector('.question__image-wrap').prepend(img);
  }

  getAuthors() {
    const authorsSet = new Set();

    authorsSet.add(this.question.author);

    while (authorsSet.size < 4) {
      authorsSet.add(State.authors[getRandomNum(0, 239)]);
    }

    return shuffle(Array.from(authorsSet));
  }

  getImagesNums() {
    const imagesNumsSet = new Set();

    imagesNumsSet.add(this.question.imageNum);

    while (imagesNumsSet.size < 4) {
      const imageNum = getRandomNum(0, 239);

      if (State.fullData[imageNum].author !== this.question.author) imagesNumsSet.add(imageNum);
    }

    return shuffle(Array.from(imagesNumsSet));
  }

  handleCorrectAnswer(answerElement) {
    answerElement.classList.add('correct');

    setTimeout(() => {
      new QuestionAnswerPopUp(this.categoryName, this.quizNum, this.question, 'correct').render();
    }, 600);
  }

  handleWrongAnswer(answerElement) {
    answerElement.classList.add('wrong');

    setTimeout(() => {
      new QuestionAnswerPopUp(this.categoryName, this.quizNum, this.question, 'wrong').render();
    }, 600);
  }

  handleAnswerBtnClick(answer) {
    timer.stop();

    switch (this.categoryName) {
      case 'artists':
        if (answer.element.textContent === this.question.author) {
          State.artists[this.quizNum - 1].questions[this.questionIndex].isCorrectAnswered = true;

          this.handleCorrectAnswer(answer.element);
        } else {
          State.artists[this.quizNum - 1].questions[this.questionIndex].isCorrectAnswered = false;

          this.handleWrongAnswer(answer.element);
        }
        break;

      case 'pictures':
        if (answer.answerData === this.question.imageNum) {
          State.pictures[this.quizNum - 1].questions[this.questionIndex].isCorrectAnswered = true;

          this.handleCorrectAnswer(answer.element);
        } else {
          State.pictures[this.quizNum - 1].questions[this.questionIndex].isCorrectAnswered = false;

          this.handleWrongAnswer(answer.element);
        }
        break;

      default:
    }
  }

  generateAnswers() {
    for (let i = 0; i < this.answers.length; i += 1) {
      const answer = new QiuzAnswerBtn(this.categoryName, this.answers[i]);

      answer.appendInto(this.element.querySelector('.question__answers-container'));

      answer.element.addEventListener('click', () => this.handleAnswerBtnClick(answer));
    }
  }
}

export default QuestionView;
