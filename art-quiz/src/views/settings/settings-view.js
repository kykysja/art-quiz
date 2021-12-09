import BaseComponent from '../../components/base-component';
import Btn from '../../components/button/button';
import BtnLink from '../../components/button-link/button-link';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import State from '../../state/state';

class SettingsView extends BaseComponent {
  constructor() {
    super('div', ['view', 'settings__view']);

    this.header = new Header();
    this.viewTitle = new BaseComponent('div', ['view-name']);
    this.viewTitle.element.textContent = 'Настройки';
    this.prevPageBtn = new BtnLink(sessionStorage.getItem('art-quiz-app-last-hash'), [
      'icon-btn',
      'prev-page-btn',
    ]);

    this.volumeOffBtn = new Btn(['icon-btn', 'volume-btn', '_off']);
    this.volumeOnBtn = new Btn(['icon-btn', 'volume-btn', '_on']);

    this.timeGameTogleBtn = new BaseComponent('input');
    this.timeGameTogleBtn.element.setAttribute('type', 'checkbox');
    this.timeGameTogleBtn.element.id = 'input-checkbox';
    if (State.settings.timeGame) this.timeGameTogleBtn.element.checked = true;

    this.decreaseTimeToAnswerBtn = new Btn(['icon-btn', 'change-value-btn', '_decrease']);
    this.increaseTimeToAnswerBtn = new Btn(['icon-btn', 'change-value-btn', '_increase']);
    this.timeOutput = new BaseComponent('span', ['output']);
    this.timeOutput.element.textContent = `${State.settings.timeToAnswer}`;

    this.setToDefaultBtn = new Btn(['btn', '_light'], 'Сбросить');
    this.saveBtn = new BtnLink(
      sessionStorage.getItem('art-quiz-app-last-hash'),
      ['btn', '_colored'],
      'Сохранить'
    );
    this.footer = new Footer();

    this.element.innerHTML = `
      <main class="main">
        <div class="container">
          <div class="setting-wrap volume-setting-wrap">
            <h3 class="setting__title">Звук</h3>
            <div class="input-wrap">
              <div class="volume"></div>
              <input class="volume-input" type="range" min="0" max="100" step="1" value="${
                State.settings.audioVolume * 100
              }">
            </div>
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
    this.prevPageBtn.prependInto(this.header.element.querySelector('.container'));
    this.viewTitle.appendInto(this.header.element.querySelector('.container'));
    this.volumeOffBtn.prependInto(this.element.querySelector('.volume__controls'));
    this.volumeOnBtn.appendInto(this.element.querySelector('.volume__controls'));
    this.timeGameTogleBtn.prependInto(this.element.querySelector('.toggle-switch'));
    this.decreaseTimeToAnswerBtn.prependInto(
      this.element.querySelector('.time-duration__controls')
    );
    this.timeOutput.appendInto(this.element.querySelector('.time-duration__controls'));
    this.increaseTimeToAnswerBtn.appendInto(this.element.querySelector('.time-duration__controls'));
    this.setToDefaultBtn.prependInto(this.element.querySelector('.buttons-container'));
    this.saveBtn.appendInto(this.element.querySelector('.buttons-container'));
    this.footer.appendInto(this.element);

    this.element.querySelector('.volume').style.width = `${State.settings.audioVolume * 100}%`;

    this.decreaseTimeToAnswerBtn.element.addEventListener('click', () =>
      this.decreaseTimeToAnswer()
    );

    this.increaseTimeToAnswerBtn.element.addEventListener('click', () =>
      this.increaseTimeToAnswer()
    );

    this.setToDefaultBtn.element.addEventListener('click', () => this.setSettingsToDefault());
    this.saveBtn.element.addEventListener('click', () => this.saveSettings());

    this.element.querySelector('.volume-input').addEventListener('input', (event) => {
      this.element.querySelector('.volume').style.width = `${event.target.value}%`;
    });

    this.volumeOnBtn.element.addEventListener('click', () => {
      this.element.querySelector('.volume-input').value = 100;
      this.element.querySelector('.volume').style.width = `100%`;
    });

    this.volumeOffBtn.element.addEventListener('click', () => {
      this.element.querySelector('.volume-input').value = 0;
      this.element.querySelector('.volume').style.width = `0%`;
    });
  }

  decreaseTimeToAnswer() {
    if (this.timeOutput.element.textContent > 5) {
      this.timeOutput.element.textContent -= 5;
    }
  }

  increaseTimeToAnswer() {
    if (this.timeOutput.element.textContent < 30) {
      this.timeOutput.element.textContent = Number(this.timeOutput.element.textContent) + 5;
    }
  }

  setSettingsToDefault() {
    this.timeOutput.element.textContent = 20;
    State.settings.timeToAnswer = 20;

    this.element.querySelector('.volume-input').value = 50;
    this.element.querySelector('.volume').style.width = `50%`;
    State.settings.audioVolume = 0.5;

    this.timeGameTogleBtn.element.checked = false;
    State.settings.timeGame = false;
  }

  saveSettings() {
    State.settings.timeToAnswer = this.timeOutput.element.textContent;

    State.settings.audioVolume = this.element.querySelector('.volume-input').value / 100;

    if (this.timeGameTogleBtn.element.checked) {
      State.settings.timeGame = true;
    } else State.settings.timeGame = false;
  }
}

export default SettingsView;
