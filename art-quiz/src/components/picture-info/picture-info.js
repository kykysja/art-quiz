import { DIV } from '../../consts/tags';
import { generateImageURL } from '../../helpers/helpers';
import BaseComponent from '../base-component';
import Img from '../img/img';

class PictureInfo extends BaseComponent {
  constructor(question) {
    super(DIV, ['picture-info']);

    this.question = question;
    this.imgUrl = generateImageURL(this.question.imageNum);
    this.imgAlt = this.question.imageNum;

    this.element.innerHTML = `
      <div class="image-wrap">
        <div class="loading">Load ...</div>
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

    await img.render(this.element.querySelector('.image-wrap'));

    this.element.querySelector('.loading').remove();
  }
}

export default PictureInfo;
