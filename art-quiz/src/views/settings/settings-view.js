import BaseComponent from '../../components/base-component';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import State from '../../state/state';

class SettingsView extends BaseComponent {
  constructor() {
    super('div', ['view', 'settings__view']);

    this.header = new Header();
    this.prevViewBtn = new BaseComponent('button', ['prev-view-btn']);
    this.prevViewBtn.element.setAttribute('type', 'button');
    this.prevViewBtn.element.innerHTML = `<a href="#"></a>`;

    this.viewNameTitle = new BaseComponent('div', ['view-name']);
    this.viewNameTitle.element.innerHTML = 'Настройки';

    this.volumeOffBtn = new BaseComponent('button', ['volume-btn', 'off-btn']);
    this.volumeOffBtn.element.setAttribute('type', 'button');

    this.volumeOnBtn = new BaseComponent('button', ['volume-btn', 'on-btn']);
    this.volumeOnBtn.element.setAttribute('type', 'button');

    this.timeGameTogleBtn = new BaseComponent('input');
    this.timeGameTogleBtn.element.setAttribute('type', 'checkbox');
    this.timeGameTogleBtn.element.id = 'input-checkbox';
    if (State.settings.timeGame) this.timeGameTogleBtn.element.checked = true;

    this.minusBtn = new BaseComponent('button', ['time-duration__btn', 'minus-btn']);
    this.minusBtn.element.setAttribute('type', 'button');

    this.plusBtn = new BaseComponent('button', ['time-duration__btn', 'plus-btn']);
    this.plusBtn.element.setAttribute('type', 'button');

    this.timeOutput = new BaseComponent('span', ['output']);
    this.timeOutput.element.textContent = `${State.settings.timeToAnswer}`;

    this.setToDefaultBtn = new BaseComponent('button', ['btn']);
    this.setToDefaultBtn.element.setAttribute('type', 'button');
    this.setToDefaultBtn.element.textContent = 'Сбросить';

    this.saveBtn = new BaseComponent('button', ['btn', 'btn_colored']);
    this.saveBtn.element.setAttribute('type', 'button');
    this.saveBtn.element.textContent = 'Сохранить';

    this.footer = new Footer();

    this.element.innerHTML = `
      <main class="main">
        <div class="container">
          <div class="setting-wrap volume-setting-wrap">
            <h3 class="setting__title">Звук</h3>
            <input class="volume-input" type="range" min="1" max="9" step="1" value="4">
            <div class="volume__controls"></div>
          </div>
          <div class="setting-wrap timer-setting-wrap">
            <div class="time-game">
              <h3 class="setting__title">Игра на время</h3>
              <div class="time-game__controls">

                <div class="toggle">
                  <label for="input-checkbox" class="toggle-switch">

                    <span class="slider off-mode">
                  </label>
                </div>
              </div>
            </div>
            <div class="time-duration">
              <h3 class="setting__title">Время на ответ</h3>
              <div class="time-duration__controls">



             </div>
            </div>
          </div>
          <div class="buttons-container">

          </div>
        </div>
      </main>
    `;

    this.header.prependInto(this.element);
    this.prevViewBtn.prependInto(this.header.element.querySelector('.container'));
    this.viewNameTitle.appendInto(this.header.element.querySelector('.container'));
    this.volumeOffBtn.prependInto(this.element.querySelector('.volume__controls'));
    this.volumeOnBtn.appendInto(this.element.querySelector('.volume__controls'));
    this.timeGameTogleBtn.prependInto(this.element.querySelector('.toggle-switch'));
    this.minusBtn.prependInto(this.element.querySelector('.time-duration__controls'));
    this.timeOutput.appendInto(this.element.querySelector('.time-duration__controls'));
    this.plusBtn.appendInto(this.element.querySelector('.time-duration__controls'));
    this.setToDefaultBtn.prependInto(this.element.querySelector('.buttons-container'));
    this.saveBtn.appendInto(this.element.querySelector('.buttons-container'));
    this.footer.appendInto(this.element);

    this.minusBtn.element.addEventListener('click', () => {
      if (this.timeOutput.element.textContent > 5) {
        this.timeOutput.element.textContent -= 5;
      }
    });

    this.plusBtn.element.addEventListener('click', () => {
      if (this.timeOutput.element.textContent < 30) {
        this.timeOutput.element.textContent = Number(this.timeOutput.element.textContent) + 5;
      }
    });

    this.setToDefaultBtn.element.addEventListener('click', () => {
      this.timeOutput.element.textContent = 20;
      State.settings.timeToAnswer = 20;
      this.timeGameTogleBtn.element.checked = false;
      State.settings.timeGame = false;
    });

    this.saveBtn.element.addEventListener('click', () => {
      State.settings.timeToAnswer = this.timeOutput.element.textContent;
      if (this.timeGameTogleBtn.element.checked) {
        State.settings.timeGame = true;
      } else State.settings.timeGame = false;
    });

    /* this.timeGameTogleBtn.element.addEventListener('change', (event) => {
      event.target.checked
        ? (this.element.querySelector('.time-game__controls .text').textContent = 'Вкл.')
        : (this.element.querySelector('.time-game__controls .text').textContent = 'Выкл.');
    }); */
  }

  render() {
    document.querySelector('#root').innerHTML = '';
    this.appendInto(document.querySelector('#root'));
  }
}

export default SettingsView;

// <span class="text">Выкл.</span>
