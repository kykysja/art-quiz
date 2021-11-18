import { setToLocalStorage } from './helpers/local-storage';
import renderCurrentView from './router/router';
import State from './state/state';

window.addEventListener('load', async () => {
  await State.setState();

  renderCurrentView();

  window.addEventListener('hashchange', renderCurrentView);
  window.addEventListener('beforeunload', () => {
    setToLocalStorage('art-quiz-app-artists-quizzes', State.artists);
    setToLocalStorage('art-quiz-app-pictures-quizzes', State.pictures);
  });
});
