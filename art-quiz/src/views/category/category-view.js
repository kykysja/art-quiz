import BaseComponent from '../../components/base-component';
import SettingsBtn from '../../components/buttons/settings-btn';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Logo from '../../components/logo/logo';
import QuizCard from '../../components/quiz-card/quiz-card';
import State from '../../state/state';

class CategoryView extends BaseComponent {
  constructor(categoryName) {
    super('div', ['view', 'category__view']);

    this.categoryName = categoryName;

    this.header = new Header();
    this.settingsBtn = new SettingsBtn();
    this.logo = new Logo();
    this.quizzesCardsContainer = new BaseComponent('ul', ['cards-container']);
    this.footer = new Footer();

    this.element.innerHTML = `
      <div class="${this.categoryName}__category-view">
        <div class="container">
          <main class="main">
            <h2 class="title">${this.categoryName === 'artists' ? 'художники' : 'картины'}</h2>
          </main>
        </div>
      </div>
    `;

    this.header.prependInto(this.element.querySelector('.container'));
    this.logo.prependInto(this.header.element);
    this.settingsBtn.appendInto(this.header.element);
    this.quizzesCardsContainer.appendInto(this.element.querySelector('.main'));
    this.footer.appendInto(this.element.querySelector('.container'));
    this.generateQuizCards();
  }

  async generateQuizCards() {
    for (let i = 0; i < 12; i += 1) {
      const quizCard = new QuizCard(
        this.categoryName,
        this.categoryName === 'artists' ? State.artists[i] : State.pictures[i]
      );

      quizCard.appendInto(this.quizzesCardsContainer.element);
    }
  }

  render() {
    document.querySelector('#root').innerHTML = '';
    this.appendInto(document.querySelector('#root'));
  }
}

export default CategoryView;
