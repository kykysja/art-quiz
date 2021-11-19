import BaseComponent from '../../components/base-component';
import QiuzAnswerBtn from '../../components/quiz-answer-btn/quiz-answer-btn';
import Timer from '../../components/timer/timer';
import { getRandomNum, shuffle } from '../../helpers/helpers';
import State from '../../state/state';

class QuestionView extends BaseComponent {
  constructor(categoryName, question) {
    super('div', ['question-view', `${categoryName}__question-view`]);

    this.categoryName = categoryName;
    this.question = question;
    this.answers = this.categoryName === 'artists' ? this.getAuthors() : this.getImagesNums();

    this.timer = new Timer();

    this.element.innerHTML =
      this.categoryName === 'artists'
        ? `
          <div class="question-wrap">
            <div class="question__text">Кто автор этой картины?</div>
            <div class="question__image-wrap">
              <img class="img"
                   src="https://raw.githubusercontent.com/kykysja/art-quiz-data/master/img/${this.question.imageNum}.jpg"
                   alt="${this.questionNum}" >
            </div>
            <div class="question__answers-container"></div>
          </div>
        `
        : `
          <div class="question-wrap">
            <div class="question__text">Какую из этих картин нарисовал ${this.question.author}</div>
            <div class="question__answers-container"></div>
          </div>
        `;

    this.timer.prependInto(this.element);
    this.generateAnswers();
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

  generateAnswers() {
    for (let i = 0; i < this.answers.length; i += 1) {
      const answer = new QiuzAnswerBtn(this.categoryName, this.answers[i]);

      answer.appendInto(this.element.querySelector('.question__answers-container'));
    }
  }
}

export default QuestionView;

/*  <div class="view quiz__view">
      <div class="artist__quiz-view">
        <div class="container">
          <header class="header">
            <button class="exit-btn"></button>
            <div class="timer">
              <span class="minutes">3</span>
              :
              <span class="seconds">49</span>
            </div>
          </header>
          <main class="main">
            <div class="question-wrap">
              <div class="question__text"></div>
              <div class="question__image-wrap">
                <img class="img" src="" alt="1" >
              </div>
              <div class="question__answers-container">
                <button class="question__answer-btn">Peter Paul Rubens</button>
                <button class="question__answer-btn">Rembrandt van Rijn</button>
                <button class="question__answer-btn">Rembrandt van Rijn</button>
                <button class="question__answer-btn">Peter Paul Rubens</button>
              </div>
            </div>
          </main>
          <footer class="footer"></footer>
        </div>
      </div>
    </div> */
