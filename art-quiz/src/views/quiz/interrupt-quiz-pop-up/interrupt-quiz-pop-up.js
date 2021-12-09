import BaseComponent from '../../../components/base-component';
import Btn from '../../../components/button/button';
import BtnLink from '../../../components/button-link/button-link';
import { closePopUp } from '../../../shared/pop-up/pop-up';

class InterruptQuizPopUp extends BaseComponent {
  constructor(categoryName) {
    super('div', ['overlay']);

    this.categoryName = categoryName;

    this.cancelBtn = new Btn(['btn'], 'Отмена');
    this.confirmBtn = new BtnLink(`#${this.categoryName}`, ['btn', '_colored'], 'Выйти');

    this.element.innerHTML = `
      <div class="pop-up-view interrupt-quiz__pop-up">
        <div class="pop-up-wrap">
          <div class="text">
            <span>Вы действительно хотите выйти из игры?</span>
            <span>Ваш результат будет утерян!</span>
          </div>
          <div class="buttons-container"></div>
        </div>
      </div>
    `;

    this.cancelBtn.prependInto(this.element.querySelector('.buttons-container'));
    this.confirmBtn.appendInto(this.element.querySelector('.buttons-container'));

    this.cancelBtn.element.addEventListener('click', closePopUp);
  }
}

export default InterruptQuizPopUp;
