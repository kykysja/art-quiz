import BaseComponent from '../../base-component';

class InterruptQuizPopUp extends BaseComponent {
  constructor(categoryName) {
    super('div', ['overlay']);

    this.categoryName = categoryName;

    this.cancelBtn = new BaseComponent('button', ['btn', 'btn_dark']);
    this.cancelBtn.element.setAttribute('type', 'button');
    this.cancelBtn.element.textContent = 'Отмена';

    this.confirmBtn = new BaseComponent('button', ['btn', 'btn_colored']);
    this.confirmBtn.element.setAttribute('type', 'button');
    this.confirmBtn.element.innerHTML = `
      <a href="#${this.categoryName}">
        <span>Выйти</span>
      </a>
    `;

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
    this.cancelBtn.element.addEventListener('click', this.closePopUp.bind(this));
  }

  closePopUp() {
    this.element.remove();
  }

  render() {
    this.prependInto(document.querySelector('#root'));
  }
}

export default InterruptQuizPopUp;
