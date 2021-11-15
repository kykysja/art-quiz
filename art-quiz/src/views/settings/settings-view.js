import BaseComponent from '../../components/base-component';

class SettingsView extends BaseComponent {
  constructor() {
    super('div', ['view', 'settings__view']);

    this.element.innerHTML = `settings view`;
  }

  render() {
    document.querySelector('#root').innerHTML = '';
    this.appendInto(document.querySelector('#root'));
  }
}

export default SettingsView;
