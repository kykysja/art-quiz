import BaseComponent from '../../components/base-component';
import SettingsBtn from '../../components/buttons/settings-btn';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Logo from '../../components/logo/logo';
import QuestionDataPopUp from '../../components/pop-up/question-data-pop-up/question-data-pop-up';
import ScoreQuestionCard from '../../components/score-question-card/score-question-card';

class ScoreView extends BaseComponent {
  constructor(categoryName, quiz) {
    super('div', ['view', 'score__view']);

    this.categoryName = categoryName;
    this.quiz = quiz;

    this.header = new Header();
    this.settingsBtn = new SettingsBtn();
    this.logo = new Logo();
    this.questionsCardsContainer = new BaseComponent('div', ['cards-container']);
    this.footer = new Footer();

    this.element.innerHTML = `
      <div class="${this.categoryName}__score-view">
        <main class="main">
          <div class="container">
            <h2 class="title">${
              this.categoryName === 'artists'
                ? `Художники / Раунд ${this.quiz.quizNum}`
                : `Kартины / Раунд ${this.quiz.quizNum}`
            }</h2>
          </div>
        </main>
      </div>
    `;

    this.header.prependInto(this.element.querySelector(`.${this.categoryName}__score-view`));
    this.logo.prependInto(this.header.element.querySelector('.container'));
    this.settingsBtn.appendInto(this.header.element.querySelector('.container'));
    this.questionsCardsContainer.appendInto(this.element.querySelector('.main .container'));
    this.footer.appendInto(this.element.querySelector(`.${this.categoryName}__score-view`));
    this.generateQuestionCards();
  }

  generateQuestionCards() {
    for (let i = 0; i < this.quiz.questions.length; i += 1) {
      const questionCard = new ScoreQuestionCard(this.quiz.questions[i]);

      questionCard.appendInto(this.questionsCardsContainer.element);

      questionCard.element.addEventListener('click', () =>
        new QuestionDataPopUp(this.quiz.questions[i]).render()
      );
    }
  }

  render() {
    document.querySelector('#root').innerHTML = '';
    this.appendInto(document.querySelector('#root'));
  }
}

export default ScoreView;
