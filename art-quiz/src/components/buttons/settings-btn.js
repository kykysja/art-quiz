import BaseComponent from '../base-component';

class SettingsBtn extends BaseComponent {
  constructor() {
    super('button', ['settings-btn']);

    this.element.setAttribute('type', 'button');
  }
}

export default SettingsBtn;
