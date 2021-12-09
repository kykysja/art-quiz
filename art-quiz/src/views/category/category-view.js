import BaseComponent from '../../components/base-component';
import BtnLink from '../../components/button-link/button-link';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Logo from '../../components/logo/logo';
import QuizCard from './quiz-card/quiz-card';
import State from '../../state/state';

class CategoryView extends BaseComponent {
  constructor(categoryName) {
    super('div', ['view', 'category__view']);

    sessionStorage.setItem('art-quiz-app-last-hash', window.location.hash);

    this.categoryName = categoryName;

    this.header = new Header();
    this.settingsBtn = new BtnLink('#settings', ['icon-btn', 'settings-btn']);
    this.logo = new Logo();
    this.quizzesCardsContainer = new BaseComponent('div', ['cards-container']);
    this.footer = new Footer();

    this.element.innerHTML = `
        <main class="main">
          <div class="container">
            <h2 class="title">${this.categoryName === 'artists' ? 'Художники' : 'Картины'}</h2>
          </div>
        </main>
    `;

    this.header.prependInto(this.element);
    this.logo.prependInto(this.header.element.querySelector('.container'));
    this.settingsBtn.appendInto(this.header.element.querySelector('.container'));
    this.quizzesCardsContainer.appendInto(this.element.querySelector('.main .container'));
    this.footer.appendInto(this.element);

    this.generateQuizCards();
  }

  async generateQuizCards() {
    const numberOfQuizzes =
      this.categoryName === 'artists' ? State.artists.length : State.pictures.length;

    for (let i = 0; i < numberOfQuizzes; i += 1) {
      const quizCard = new QuizCard(
        this.categoryName,
        this.categoryName === 'artists' ? State.artists[i] : State.pictures[i]
      );

      quizCard.appendInto(this.quizzesCardsContainer.element);
    }
  }
}

export default CategoryView;
