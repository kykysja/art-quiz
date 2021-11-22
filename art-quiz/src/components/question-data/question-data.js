import BaseComponent from '../base-component';

class QuestionData extends BaseComponent {
  constructor(question) {
    super('div', ['question-data']);

    this.question = question;

    this.element.innerHTML = `
      <div class="image-wrap img-btn">
        <img class="img"
             src="https://raw.githubusercontent.com/kykysja/art-quiz-data/master/img/${this.question.imageNum}.jpg"
             alt="${this.question.imageNum}">
      </div>
      <div class="picture-name">${this.question.name}</div>
      <div class="description">
        <span class="author">${this.question.author}</span>,
        <span class="year">${this.question.year}</span>
      </div>

    `;
  }
}

export default QuestionData;
