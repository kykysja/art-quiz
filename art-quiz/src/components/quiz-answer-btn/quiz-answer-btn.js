import { getImage } from '../../api/data';
import BaseComponent from '../base-component';

class QiuzAnswerBtn extends BaseComponent {
  constructor(categoryName, answer) {
    super('button', ['question__answer-btn', `${categoryName === 'artists' ? 'btn' : 'img-btn'}`]);

    this.element.setAttribute('type', 'button');
    if (categoryName === 'artists') this.element.classList.add('category-btn__link');

    this.categoryName = categoryName;
    this.answerData = answer;

    if (this.categoryName === 'artists') this.element.innerHTML = `${this.answerData}`;
    else {
      this.element.innerHTML = '<div class="loading">Load ...</div>';
      this.createImage(
        `https://raw.githubusercontent.com/kykysja/art-quiz-data/master/img/${this.answerData}.jpg`
      );
    }
  }

  async createImage(url) {
    const img = await getImage(url);

    img.className = 'img';
    img.setAttribute('alt', `${this.answerData}`);

    this.element.querySelector('.loading').remove();
    this.element.prepend(img);
  }
}

export default QiuzAnswerBtn;
