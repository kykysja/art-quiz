import BaseComponent from '../../components/base-component';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';

import Btn from '../../components/button/button';
import BtnLink from '../../components/button/button-link/button-link';

class MainScreen extends BaseComponent {
  constructor() {
    super('div', ['view', 'main-screen__view']);

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

    this.settingsBtn = new Btn(['icon-btn', 'settings-btn']);
    this.settingsBtnLink = new BtnLink('#settings');
    this.logo = new Logo();
    this.artistsBtn = new Btn(['btn_light']);
    this.artistsBtnLink = new BtnLink('#artists', 'Xудожники');
    this.picturesBtn = new Btn(['btn_light']);
    this.picturesBtnLink = new BtnLink('#pictures', 'Kартины');
    this.footer = new Footer();

    this.settingsBtn.prependInto(this.element.querySelector('.settings-btn-wrap'));
    this.settingsBtnLink.prependInto(this.settingsBtn.element);
    this.logo.appendInto(this.element.querySelector('.logo-wrap'));
    this.artistsBtn.prependInto(this.element.querySelector('.category-btns-container'));
    this.artistsBtnLink.prependInto(this.artistsBtn.element);
    this.picturesBtn.appendInto(this.element.querySelector('.category-btns-container'));
    this.picturesBtnLink.prependInto(this.picturesBtn.element);
    this.footer.appendInto(this.element);
  }
}

export default MainScreen;
