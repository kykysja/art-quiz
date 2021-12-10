import BaseComponent from '../../components/base-component';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import BtnLink from '../../components/button-link/button-link';
import { DIV } from '../../consts/tags';

class MainScreen extends BaseComponent {
  constructor() {
    super(DIV, ['view', 'main-screen__view']);

    sessionStorage.setItem('art-quiz-app-last-hash', '#');

    this.element.innerHTML = `
      <main class="main">
        <div class="container">
          <div class="settings-btn-wrap"></div>
          <div class="content-wrap">
            <div class="logo-wrap"></div>
            <div class="category-btns-container"></div>
          </div>
        </div>
      </main>
    `;

    this.settingsBtn = new BtnLink('#settings', ['icon-btn', 'settings-btn']);
    this.logo = new Logo();
    this.artistsBtn = new BtnLink('#artists', ['btn', '_light'], 'Xудожники');
    this.picturesBtn = new BtnLink('#pictures', ['btn', '_light'], 'Kартины');
    this.footer = new Footer();

    this.settingsBtn.prependInto(this.element.querySelector('.settings-btn-wrap'));
    this.logo.appendInto(this.element.querySelector('.logo-wrap'));
    this.artistsBtn.prependInto(this.element.querySelector('.category-btns-container'));
    this.picturesBtn.appendInto(this.element.querySelector('.category-btns-container'));
    this.footer.appendInto(this.element);
  }
}

export default MainScreen;
