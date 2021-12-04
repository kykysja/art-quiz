import BaseComponent from '../../../components/base-component';
import Img from '../../../components/img/img';
import { generateImageURL } from '../../../helpers/helpers';

class QuestionAnswerBtn extends BaseComponent {
  constructor(categoryName, answer) {
    const classes = categoryName === 'artists' ? ['btn', 'btn_light'] : ['img-btn'];

    super('button', ['question__answer-btn', ...classes]);

    this.element.setAttribute('type', 'button');

    this.categoryName = categoryName;
    this.answer = answer;

    if (this.categoryName === 'artists') {
      this.element.innerHTML = `${this.answer}`;
    } else {
      this.element.innerHTML = '<div class="loading">Load ...</div>';

      this.renderImage();
    }
  }

  async renderImage() {
    const url = generateImageURL(this.answer);

    const img = new Img(url, this.answer);

    this.element.querySelector('.loading').remove();

    img.render(this.element);
  }
}

export default QuestionAnswerBtn;
