import BaseComponent from '../base-component';

class Footer extends BaseComponent {
  constructor() {
    super('footer', ['footer']);

    this.element.innerHTML = `

        <a class="rss-logo" href="https://rs.school" target="blank"></a>
        <div class="footer__author">
          <span>created by: </span>
          <a
            class="author__link"
            href="https://github.com/kykysja?tab=repositories"
            target="blank"
            >Yuliia Nunnaieva</a
          >
        </div>
        <span class="footer__date">2021</span>

    `;
  }
}

export default Footer;
