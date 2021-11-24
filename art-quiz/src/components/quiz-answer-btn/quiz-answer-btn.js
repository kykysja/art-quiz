import { getImage } from '../../api/data';
import BaseComponent from '../base-component';

class QiuzAnswerBtn extends BaseComponent {
  constructor(categoryName, answer) {
    super('button', [
      'question__answer-btn',
      `${categoryName === 'artists' ? 'btn' : 'img-btn'}`,
      'animated-border',
    ]);

    this.element.setAttribute('type', 'button');

    this.categoryName = categoryName;
    this.answerData = answer;

    if (this.categoryName === 'artists') this.element.innerHTML = `${this.answerData}`;
    else
      this.createImage(
        `https://raw.githubusercontent.com/kykysja/art-quiz-data/master/img/${this.answerData}.jpg`
      );
  }

  async createImage(url) {
    const img = await getImage(url);

    img.className = 'img';
    img.setAttribute('alt', `${this.answerData}`);

    this.element.prepend(img);
  }
}

export default QiuzAnswerBtn;
