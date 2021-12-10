import BaseComponent from '../../components/base-component';
import Btn from '../../components/button/button';
import Footer from '../../components/footer/footer';
import timer from '../../shared/timer/timer';
import { renderPopUp } from '../../shared/pop-up/pop-up';
import State from '../../state/state';
import QuestionView from '../question/question-view';
import InterruptQuizPopUp from './interrupt-quiz-pop-up/interrupt-quiz-pop-up';
import { DIV } from '../../consts/tags';

class QuizView extends BaseComponent {
  constructor(categoryName, quiz) {
    super(DIV, ['view', 'quiz__view']);

    this.categoryName = categoryName;
    this.quiz = quiz;

    this.updateState();

    this.exitQuizBtn = new Btn(['icon-btn', 'exit-btn']);
    this.footer = new Footer();

    this.element.innerHTML = `
      <main class="main">
        <div class="container">
          <div class="slider-wrap">
            <div class="questions-container"></div>
          </div>
        </div>
      </main>
    `;

    this.exitQuizBtn.prependInto(this.element.querySelector('.container'));
    this.footer.appendInto(this.element);

    this.generateQuestions();

    this.exitQuizBtn.element.addEventListener('click', () =>
      renderPopUp(new InterruptQuizPopUp(this.categoryName))
    );
  }

  updateState() {
    if (this.categoryName === 'artists') {
      State.artists[this.quiz.quizNum - 1].isPlayed = true;

      for (let i = 0; i < State.artists[this.quiz.quizNum - 1].questions.length; i += 1) {
        State.artists[this.quiz.quizNum - 1].questions[i].isCorrectAnswered = false;
      }
    } else if (this.categoryName === 'pictures') {
      State.pictures[this.quiz.quizNum - 1].isPlayed = true;

      for (let i = 0; i < State.pictures[this.quiz.quizNum - 1].questions.length; i += 1) {
        State.pictures[this.quiz.quizNum - 1].questions[i].isCorrectAnswered = false;
      }
    }
  }

  generateQuestions() {
    for (let i = 0; i < this.quiz.questions.length; i += 1) {
      new QuestionView(this.categoryName, this.quiz.quizNum, this.quiz.questions[i], i).appendInto(
        this.element.querySelector('.questions-container')
      );
    }
    if (State.settings.timeGame) timer.start(State.settings.timeToAnswer, this.quiz.questions[0]);
  }
}

export default QuizView;
