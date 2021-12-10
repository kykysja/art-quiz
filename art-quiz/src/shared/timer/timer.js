const TIMER_STEP = 1000;
class Timer {
  onRunning() {
    if (this.remainingTime < 1) {
      clearInterval(this.interval);
    }

    document.querySelector('.timer-output').firstChild.textContent = this.remainingTime;

    this.remainingTime -= 1;
  }

  start(duration, currentQuestion) {
    clearInterval(this.interval);

    this.remainingTime = duration;
    this.currentQuestion = currentQuestion;

    this.interval = setInterval(() => this.onRunning(), TIMER_STEP);
  }

  stop() {
    clearInterval(this.interval);
  }
}

export default new Timer();
