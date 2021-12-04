import BaseComponent from '../../../components/base-component';
import Btn from '../../../components/button/button';
import PictureInfo from '../../../components/picture-info/picture-info';
import { closePopUp } from '../../../shared/pop-up/pop-up';

class PictureInfoPopUp extends BaseComponent {
  constructor(question) {
    super('div', ['overlay']);

    this.question = question;

    this.pictureInfo = new PictureInfo(this.question);
    this.closeBtn = new Btn(['btn', 'btn_colored'], 'Закрыть');

    this.element.innerHTML = `
      <div class="pop-up-view question-data__pop-up"></div>
    `;

    this.pictureInfo.prependInto(this.element.querySelector('.question-data__pop-up'));
    this.closeBtn.appendInto(this.element.querySelector('.question-data__pop-up'));

    this.closeBtn.element.addEventListener('click', closePopUp);
  }
}

export default PictureInfoPopUp;
