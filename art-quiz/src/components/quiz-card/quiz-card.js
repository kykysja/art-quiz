import State from '../../state/state';
import BaseComponent from '../base-component';
import { getImage } from '../../api/data';

class QiuzCard extends BaseComponent {
  constructor(categoryName, quiz) {
    super('li', ['card-item', 'quiz-card']);

    this.categoryName = categoryName;
    this.quiz = quiz;

    this.scoreBtn = new BaseComponent('button', ['score-btn']);
    this.scoreBtn.element.setAttribute('type', 'button');
    this.scoreBtn.element.innerHTML = `
      <a href="#${this.categoryName}/quiz/${this.quiz.quizNum}/score"></a>
    `;

    this.element.innerHTML = `
      <h3 class="card__title">${this.quiz.quizNum} раунд</h3>
      <div class="img-btn">
        <a class="card__play-btn"
           href="#${this.categoryName}/quiz/${this.quiz.quizNum}">${
      this.quiz.isPlayed
        ? '<span class="play-again-btn"></span><span>Play Again</span>'
        : '<span>Play Quiz</span>'
    }
        </a>
        <div class="loading">Load ...</div>
      </div>
      ${
        this.quiz.isPlayed
          ? `
              <div class="card__description">
                <div class="progress">
                  <span class="right-answers">${this.countCorrectAnsweredQuestions()}</span>
                  <span class="total-answers">/10</span>
                </div>
              </div>
            `
          : ''
      }
    `;

    this.createImage(
      `https://raw.githubusercontent.com/kykysja/art-quiz-data/master/img/${this.quiz.imageNum}.jpg`
    );

    if (this.element.querySelector('.card__description')) {
      this.scoreBtn.appendInto(this.element.querySelector('.card__description'));
    }
  }

  async createImage(url) {
    const img = await getImage(url);

    img.className = `img${this.quiz.isPlayed ? ' passed' : ''}`;
    img.setAttribute('alt', `${this.quiz.imageNum}`);

    // this.element.querySelector('.img-btn').innerHTML = '';
    this.element.querySelector('.loading').remove();
    this.element.querySelector('.img-btn').prepend(img);
  }

  countCorrectAnsweredQuestions() {
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
}

export default QiuzCard;
