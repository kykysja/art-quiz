import State from '../state/state';
import CategoryView from '../views/category/category-view';
import MainScreen from '../views/main-screen/main-screen';
import QuizView from '../views/quiz/quiz-view';
import SettingsView from '../views/settings/settings-view';

const Router = {
  views: {
    MainScreen,
    CategoryView,
    QuizView,
    SettingsView,
  },

  renderCurrentView() {
    const url = window.location.hash.slice(1) || '/';

    switch (true) {
      case /artists\/quiz/.test(url):
        new this.views.QuizView('artists', State.artists[url.split('/')[2] - 1]).render();
        break;

      case /pictures\/quiz/.test(url):
        new this.views.QuizView('pictures', State.pictures[url.split('/')[2] - 1]).render();
        break;

      case /artists/.test(url):
        new this.views.CategoryView('artists').render();
        break;

      case /pictures/.test(url):
        new this.views.CategoryView('pictures').render();
        break;

      case /settings/.test(url):
        new this.views.SettingsView().render();
        break;

      case /\//.test(url):
        new this.views.MainScreen().render();
        break;

      default:
      //! to create 404 page!
    }
  },
};

export default Router;
