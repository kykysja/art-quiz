import BaseComponent from '../base-component';

class SettingsBtn extends BaseComponent {
  constructor() {
    super('button', ['settings-btn']);

    this.element.setAttribute('type', 'button');
    this.element.innerHTML = '<a href="#settings"></a>';
  }
}

export default SettingsBtn;
