import BaseComponent from '../../../components/base-component';
import State from '../../../state/state';
import Img from '../../../components/img/img';
import { generateImageURL } from '../../../helpers/helpers';
import Btn from '../../../components/button/button';
import BtnLink from '../../../components/button/button-link/button-link';

class QiuzCard extends BaseComponent {
  constructor(categoryName, quiz) {
    super('div', ['quiz-card', 'card-item']);

    this.categoryName = categoryName;
    this.quiz = quiz;
    this.imgUrl = generateImageURL(this.quiz.imageNum);
    this.imgAlt = this.quiz.imageNum;
    this.imgClasses = `img${this.quiz.isPlayed ? ' passed' : ''}`;

    this.scoreBtn = new Btn(['icon-btn', 'score-btn']);
    this.scoreBtnLink = new BtnLink(`#${this.categoryName}/quiz/${this.quiz.quizNum}/score`);

    this.element.innerHTML = `
      <h3 class="card__title">${this.quiz.quizNum} раунд</h3>
      <div class="card__image img-btn">
        <a class="card__play-btn" href="#${this.categoryName}/quiz/${this.quiz.quizNum}">
          ${
            this.quiz.isPlayed
              ? '<span class="repeat-btn"></span><span>Play Again</span>'
              : '<span>Play Quiz</span>'
          }
        </a>
        <div class="loading">Load ...</div>
      </div>
      ${
        this.quiz.isPlayed
          ? `
              <div class="card__info">
                <div class="progress">
                  <span class="right-answers">${this.countCorrectAnswers()}</span>
                  <span class="total-answers">/${this.quiz.questions.length}</span>
                </div>
              </div>
            `
          : ''
      }
    `;

    this.renderImage();

    if (this.element.querySelector('.card__info')) {
      this.scoreBtn.appendInto(this.element.querySelector('.card__info'));
      this.scoreBtnLink.prependInto(this.scoreBtn.element);
    }
  }

  countCorrectAnswers() {
    let correctAnswered;

    if (this.categoryName === 'artists') {
      correctAnswered = State.artists[this.quiz.quizNum - 1].questions.filter(
        (el) => el.isCorrectAnswered
      );
    } else if (this.categoryName === 'pictures') {
      correctAnswered = State.pictures[this.quiz.quizNum - 1].questions.filter(
        (el) => el.isCorrectAnswered
      );
    }

    return correctAnswered.length;
  }

  renderImage() {
    const img = new Img(this.imgUrl, this.imgAlt);

    this.element.querySelector('.loading').remove();

    img.render(this.element.querySelector('.img-btn'));
  }
}

export default QiuzCard;
