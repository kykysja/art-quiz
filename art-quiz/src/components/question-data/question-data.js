import { getImage } from '../../api/data';
import BaseComponent from '../base-component';

class QuestionData extends BaseComponent {
  constructor(question) {
    super('div', ['question-data']);

    this.question = question;

    this.element.innerHTML = `
      <div class="image-wrap img-btn">
        <div class="loading">Load ...</div>
      </div>
      <div class="picture-name">${this.question.name}</div>
      <div class="description">
        <span class="author">${this.question.author}</span>,
        <span class="year">${this.question.year}</span>
      </div>
    `;

    this.createImage(
      `https://raw.githubusercontent.com/kykysja/art-quiz-data/master/img/${this.question.imageNum}.jpg`
    );
  }

  async createImage(url) {
    const img = await getImage(url);

    img.className = 'img';
    img.setAttribute('alt', `${this.question.imageNum}`);

    this.element.querySelector('.loading').remove();
    this.element.querySelector('.image-wrap').classList.remove('loading');
    this.element.querySelector('.image-wrap').prepend(img);
  }
}

export default QuestionData;
