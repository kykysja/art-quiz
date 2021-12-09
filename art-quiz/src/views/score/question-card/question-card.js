import { generateImageURL } from '../../../helpers/helpers';
import BaseComponent from '../../../components/base-component';
import PictureInfoPopUp from '../picture-info-pop-up/picture-info-pop-up';
import Img from '../../../components/img/img';
import { renderPopUp } from '../../../shared/pop-up/pop-up';

class QuestionCard extends BaseComponent {
  constructor(question) {
    super('button', ['card-item', 'question-card', 'img-btn']);

    this.element.setAttribute('type', 'button');

    this.question = question;
    this.imgUrl = generateImageURL(this.question.imageNum);
    this.imgAlt = this.question.imageNum;

    this.element.innerHTML = '<div class="loading">Load ...</div>';

    this.renderImage();

    this.element.addEventListener('click', () => renderPopUp(new PictureInfoPopUp(this.question)));
  }

  async renderImage() {
    const img = new Img(this.imgUrl, this.imgAlt);

    await img.render(this.element);

    this.element.querySelector('.loading').remove();
  }
}

export default QuestionCard;
