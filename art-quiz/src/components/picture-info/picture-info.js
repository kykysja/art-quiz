import { generateImageURL } from '../../helpers/helpers';
import BaseComponent from '../base-component';
import Img from '../img/img';

class PictureInfo extends BaseComponent {
  constructor(question) {
    super('div', ['question-data']);

    this.question = question;
    this.imgUrl = generateImageURL(this.question.imageNum);
    this.imgAlt = this.question.imageNum;

    this.element.innerHTML = `
      <div class="image-wrap img-btn">
        <div class="loading">
          <div class="loading">Load ...</div>
        </div>
      </div>
      <div class="picture-name">${this.question.name}</div>
      <div class="description">
        <span class="author">${this.question.author}</span>,
        <span class="year">${this.question.year}</span>
      </div>
    `;

    this.renderImage();
  }

  async renderImage() {
    const img = new Img(this.imgUrl, this.imgAlt);

    this.element.querySelector('.loading').remove();

    img.render(this.element.querySelector('.image-wrap'));
  }
}

export default PictureInfo;
