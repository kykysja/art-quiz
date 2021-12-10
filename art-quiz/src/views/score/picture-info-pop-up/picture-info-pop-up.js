import BaseComponent from '../../../components/base-component';
import Btn from '../../../components/button/button';
import PictureInfo from '../../../components/picture-info/picture-info';
import { DIV } from '../../../consts/tags';
import { closePopUp } from '../../../shared/pop-up/pop-up';

class PictureInfoPopUp extends BaseComponent {
  constructor(question) {
    super(DIV, ['overlay']);

    this.question = question;

    this.pictureInfo = new PictureInfo(this.question);
    this.closeBtn = new Btn(['btn', '_colored'], 'Закрыть');

    this.element.innerHTML = `
      <div class="pop-up-view picture-info__pop-up"></div>
    `;

    this.pictureInfo.prependInto(this.element.querySelector('.picture-info__pop-up'));
    this.closeBtn.appendInto(this.element.querySelector('.picture-info__pop-up'));

    this.closeBtn.element.addEventListener('click', closePopUp);
  }
}

export default PictureInfoPopUp;
