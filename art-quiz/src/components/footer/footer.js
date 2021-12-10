import { FOOTER } from '../../consts/tags';
import BaseComponent from '../base-component';

class Footer extends BaseComponent {
  constructor() {
    super(FOOTER, ['footer']);

    this.element.innerHTML = `
      <div class="container">
        <a class="rss-logo" href="https://rs.school" target="blank"></a>
        <div class="footer__author">
          <a
            class="author__link"
            href="https://github.com/kykysja?tab=repositories"
            target="blank"
            >Yuliia Nunnaieva</a
          >
        </div>
        <span class="footer__date">2021</span>
      </div>
    `;
  }
}

export default Footer;
