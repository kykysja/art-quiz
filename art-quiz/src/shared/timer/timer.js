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

    this.interval = setInterval(() => this.onRunning(), 1000);
  }

  stop() {
    clearInterval(this.interval);
  }
}

export default new Timer();
