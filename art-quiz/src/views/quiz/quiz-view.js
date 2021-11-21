import BaseComponent from '../../components/base-component';
import ExitQuizBtn from '../../components/buttons/exit-quiz-btn';
import Footer from '../../components/footer/footer';
import State from '../../state/state';
import QuestionView from '../question/question-view';

class QuizView extends BaseComponent {
  constructor(categoryName, quiz) {
    super('div', ['view', 'quiz__view']);

    this.categoryName = categoryName;
    this.quiz = quiz;

    this.updateState();

    this.exitBtn = new ExitQuizBtn();
    this.footer = new Footer();

    this.element.innerHTML = `
      <div class="container">
        <main class="main">
          <div class="slider-wrap">
            <div class="questions-container"></div>
          </div>
        </main>
      </div>
    `;

    this.exitBtn.prependInto(this.element.querySelector('.main'));
    this.footer.appendInto(this.element.querySelector('.container'));
    this.generateQuestions();
  }

  updateState() {
    if (this.categoryName === 'artists') {
      State.artists[this.quiz.quizNum - 1].isPlayed = true;
      State.artists[this.quiz.quizNum - 1].gamesStatistic.push({ correctAnswers: 0 });
    } else if (this.categoryName === 'pictures') {
      State.pictures[this.quiz.quizNum - 1].isPlayed = true;
      State.pictures[this.quiz.quizNum - 1].gamesStatistic.push({ correctAnswers: 0 });
    }
  }

  generateQuestions() {
    for (let i = 0; i < this.quiz.questions.length; i += 1) {
      new QuestionView(this.categoryName, this.quiz.quizNum, this.quiz.questions[i], i).appendInto(
        this.element.querySelector('.questions-container')
      );
    }
  }

  render() {
    document.querySelector('#root').innerHTML = '';
    this.appendInto(document.querySelector('#root'));
  }
}

export default QuizView;
