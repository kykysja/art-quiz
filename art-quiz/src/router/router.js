import CategoryView from '../views/category/category-view';
import MainScreen from '../views/main-screen/main-screen';
import QuizView from '../views/quiz/quiz-view';
import SettingsView from '../views/settings/settings-view';

function renderCurrentView() {
  const url = window.location.hash.slice(1) || '/';

  switch (true) {
    case /artists\/quiz/.test(url):
      new QuizView('artists', url[url.length - 1]).render();
      break;

    case /pictures\/quiz/.test(url):
      new QuizView('pictures', url[url.length - 1]).render();
      break;

    case /artists/.test(url):
      new CategoryView('artists', 0).render();
      break;

    case /pictures/.test(url):
      new CategoryView('pictures', 120).render();
      break;

    case /settings/.test(url):
      new SettingsView().render();
      break;

    case /\//.test(url):
      new MainScreen().render();
      break;

    default:
    //! to create 404 page!
  }
}

export default renderCurrentView;
