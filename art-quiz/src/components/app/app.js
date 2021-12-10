import Router from '../../router/router';
import State from '../../state/state';
import { setToLocalStorage } from '../../shared/local-storage/local-storage';
import { DIV } from '../../consts/tags';

class App {
  constructor() {
    this.rootElement = document.createElement(DIV);
    this.rootElement.id = 'root';
  }

  async init() {
    document.body.prepend(this.rootElement);

    await State.setState();

    Router.renderCurrentView();

    window.addEventListener('hashchange', () => Router.renderCurrentView());

    window.addEventListener('beforeunload', () => {
      setToLocalStorage('art-quiz-app-artists-quizzes', State.artists);
      setToLocalStorage('art-quiz-app-pictures-quizzes', State.pictures);
      setToLocalStorage('art-quiz-app-settings', State.settings);
    });
  }
}

export default App;
