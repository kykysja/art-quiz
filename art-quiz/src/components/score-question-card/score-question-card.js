import { getImage } from '../../api/data';
import BaseComponent from '../base-component';
import QuestionDataPopUp from '../pop-up/question-data-pop-up/question-data-pop-up';

class ScoreQuestionCard extends BaseComponent {
  constructor(question) {
    super('button', ['card-item', 'question-card', 'img-btn']);

    this.element.setAttribute('type', 'button');

    this.question = question;

    this.createImage(
      `https://raw.githubusercontent.com/kykysja/art-quiz-data/master/img/${this.question.imageNum}.jpg`
    );

    this.element.addEventListener('click', () => new QuestionDataPopUp(this.question));
  }

  async createImage(url) {
    const img = await getImage(url);

    img.className = `img${this.question.isCorrectAnswered ? ' passed' : ''}`;
    img.setAttribute('alt', `${this.question.imageNum}`);

    this.element.prepend(img);
  }
}

export default ScoreQuestionCard;
