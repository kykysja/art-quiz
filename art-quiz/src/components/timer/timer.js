class Timer {
  func() {
    if (this.remainingTime < 1) {
      clearInterval(this.interval);
    }

    document.querySelector('.seconds').firstChild.textContent = this.remainingTime;
    this.remainingTime -= 1;
  }

  start(duration, currentQuestion) {
    clearInterval(this.interval);
    this.remainingTime = duration;
    this.currentQuestion = currentQuestion;

    this.interval = setInterval(() => this.func(), 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  /* getTimeElapsedSinceLastStart() {
    if (!this.startTime) {
      return 0;
    }

    return Date.now() - this.startTime;
  }

  start() {
    if (this.isRunning) return;

    // console.error('Timer is already running');

    this.isRunning = true;

    this.startTime = Date.now();
  }

  stop() {
    if (!this.isRunning) return;

    // console.error('Timer is already stopped');

    this.isRunning = false;

    this.overallTime += this.getTimeElapsedSinceLastStart();
  }

  reset() {
    this.overallTime = 0;

    if (this.isRunning) {
      this.startTime = Date.now();
      return;
    }

    this.startTime = 0;
  }

  getTime() {
    if (!this.startTime) {
      return 0;
    }

    if (this.isRunning) {
      return this.overallTime + this.getTimeElapsedSinceLastStart();
    }

    return this.overallTime;
  } */
}

export default new Timer();
/* const timer = new Timer();
timer.start();
setInterval(() => {
  const timeInSeconds = Math.round(timer.getTime() / 1000);
  document.getElementById('time').innerText = timeInSeconds;
}, 100); */

/* import BaseComponent from '../base-component';

class Timer extends BaseComponent {
  constructor() {
    super('div', ['timer']);

    this.element.innerHTML = `
      <span class="minutes">3</span>:<span class="seconds">49</span>
    `;
  }
} */
