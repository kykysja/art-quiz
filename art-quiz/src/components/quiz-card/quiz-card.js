import State from '../../state/state';
import ScoreView from '../../views/score/score-view';
import BaseComponent from '../base-component';

class QiuzCard extends BaseComponent {
  constructor(categoryName, quiz) {
    super('li', ['card-item', 'quiz-card']);

    this.categoryName = categoryName;
    this.quiz = quiz;

    this.scoreBtn = new BaseComponent('button', ['score-btn']);
    this.scoreBtn.element.setAttribute('type', 'button');

    this.element.innerHTML = `
      <h3 class="card__title">${this.quiz.quizNum} раунд</h3>
      <a class="img-btn" href="#${this.categoryName}/quiz/${this.quiz.quizNum}">
        <img class="img ${this.quiz.isPlayed ? 'passed' : ''}"
             src="https://raw.githubusercontent.com/kykysja/art-quiz-data/master/img/${
               this.quiz.imageNum
             }.jpg"
             alt="${this.quiz.imageNum}" />
      </a>
      ${
        this.quiz.isPlayed
          ? `
              <div class="card__description">
                <div class="progress">
                  <span class="right-answers">${this.countCorrectAnsweredQuestions()}</span><span class="total-answers">/10</span>
                </div>
              </div>
            `
          : ''
      }
    `;

    if (this.element.querySelector('.card__description')) {
      this.scoreBtn.appendInto(this.element.querySelector('.card__description'));
      this.scoreBtn.element.addEventListener('click', () =>
        new ScoreView(this.categoryName, this.quiz).render()
      );
    }
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
