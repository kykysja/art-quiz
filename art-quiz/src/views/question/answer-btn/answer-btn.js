import BaseComponent from '../../../components/base-component';
import Img from '../../../components/img/img';
import { BUTTON } from '../../../consts/tags';
import { generateImageURL } from '../../../helpers/helpers';

class QuestionAnswerBtn extends BaseComponent {
  constructor(categoryName, answer) {
    const classes = categoryName === 'artists' ? ['btn', '_light'] : ['img-btn'];

    super(BUTTON, ['question__answer-btn', ...classes]);

    this.element.setAttribute('type', BUTTON);

    this.categoryName = categoryName;
    this.answerData = answer;

    if (this.categoryName === 'artists') {
      this.element.innerHTML = `${this.answerData}`;
    } else {
      this.element.innerHTML = '<div class="loading">Load ...</div>';

      this.renderImage();
    }
  }

  async renderImage() {
    const url = generateImageURL(this.answerData);

    const img = new Img(url, this.answerData);

    await img.render(this.element);

    this.element.querySelector('.loading').remove();
  }
}

export default QuestionAnswerBtn;
