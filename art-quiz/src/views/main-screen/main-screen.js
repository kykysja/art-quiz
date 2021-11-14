import BaseComponent from '../../components/base-component';
import SettingsBtn from '../../components/buttons/settings-btn';
import Logo from '../../components/logo/logo';
import CategoryBtn from '../../components/buttons/category-btn';
import Footer from '../../components/footer/footer';

class MainScreen extends BaseComponent {
  constructor() {
    super('div', ['view', 'main-screen__view']);

    this.element.innerHTML = `
      <div class="container">
        <main class="main">
          <div class="settings-btn-wrap"></div>
          <div class="logo-wrap"></div>
          <div class="category-btns-container"></div>
        </main>
      </div>
    `;

    this.settingsBtn = new SettingsBtn();
    this.logo = new Logo();
    this.artistsBtn = new CategoryBtn('artists');
    this.picturesBtn = new CategoryBtn('pictures');
    this.footer = new Footer();

    this.settingsBtn.appendInto(this.element.querySelector('.settings-btn-wrap'));
    this.logo.appendInto(this.element.querySelector('.logo-wrap'));
    this.artistsBtn.prependInto(this.element.querySelector('.category-btns-container'));
    this.picturesBtn.appendInto(this.element.querySelector('.category-btns-container'));
    this.footer.appendInto(this.element.querySelector('.container'));
  }

  render() {
    document.querySelector('#root').innerHTML = '';
    this.appendInto(document.querySelector('#root'));
  }
}

export default MainScreen;
