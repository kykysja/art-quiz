import { setToLocalStorage } from './local-storage/local-storage';
import Router from './router/router';
import State from './state/state';

window.addEventListener('load', async () => {
  await State.setState();

  Router.renderCurrentView();

  window.addEventListener('hashchange', () => Router.renderCurrentView());
  window.addEventListener('beforeunload', () => {
    setToLocalStorage('art-quiz-app-artists-quizzes', State.artists);
    setToLocalStorage('art-quiz-app-pictures-quizzes', State.pictures);
    setToLocalStorage('art-quiz-app-settings', State.settings);
  });
});
