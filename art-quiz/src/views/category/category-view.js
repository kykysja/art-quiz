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
        <main class="main">
          <div class="container">
            <h2 class="title">${this.categoryName === 'artists' ? 'художники' : 'картины'}</h2>
          </div>
        </main>
      </div>
    `;

    this.header.prependInto(this.element.querySelector(`.${this.categoryName}__category-view`));
    this.logo.prependInto(this.header.element.querySelector('.container'));
    this.settingsBtn.appendInto(this.header.element.querySelector('.container'));
    this.quizzesCardsContainer.appendInto(this.element.querySelector('.main .container'));
    this.footer.appendInto(this.element.querySelector(`.${this.categoryName}__category-view`));
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
