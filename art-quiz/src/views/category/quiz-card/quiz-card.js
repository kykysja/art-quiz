import BaseComponent from '../../../components/base-component';
import State from '../../../state/state';
import Img from '../../../components/img/img';
import BtnLink from '../../../components/button-link/button-link';
import { generateImageURL } from '../../../helpers/helpers';
import { DIV } from '../../../consts/tags';

class QiuzCard extends BaseComponent {
  constructor(categoryName, quiz) {
    super(DIV, ['quiz-card', 'card-item']);

    this.categoryName = categoryName;
    this.quiz = quiz;
    this.imgUrl = generateImageURL(this.quiz.imageNum);
    this.imgAlt = this.quiz.imageNum;

    this.scoreBtn = new BtnLink(`#${this.categoryName}/quiz/${this.quiz.quizNum}/score`, [
      'icon-btn',
      'score-btn',
    ]);

    this.element.innerHTML = `
      <h3 class="card__title">${this.quiz.quizNum} раунд</h3>
      <a class="card__image img-btn" href="#${this.categoryName}/quiz/${this.quiz.quizNum}">
        <div class="loading">Load ...</div>
      </a>
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

  async renderImage() {
    const img = new Img(this.imgUrl, this.imgAlt);

    if (this.quiz.isPlayed) img.element.classList.add('_passed');

    await img.render(this.element.querySelector('.img-btn'));

    this.element.querySelector('.loading').remove();
  }
}

export default QiuzCard;
