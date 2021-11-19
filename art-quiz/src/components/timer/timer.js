import BaseComponent from '../base-component';

class Timer extends BaseComponent {
  constructor() {
    super('div', ['timer']);

    this.element.innerHTML = `
      <span class="minutes">3</span>:<span class="seconds">49</span>
    `;
  }
}

export default Timer;
