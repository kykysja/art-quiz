import apdateHistoryState from '../api/history';
import CategoryView from '../views/category/category-view';
import MainScreen from '../views/main-screen/main-screen';
import SettingsView from '../views/settings/settings-view';

class App {
  constructor() {
    this.mainScreen = new MainScreen();
    this.artistsView = new CategoryView('artists', 0);
    this.picturesView = new CategoryView('pictures', 120);
    this.settingsView = new SettingsView();

    this.mainScreen.settingsBtn.element.addEventListener('click', () =>
      this.handleViewChange('/settings')
    );
    this.mainScreen.artistsBtn.element.addEventListener('click', () =>
      this.handleViewChange('/artists')
    );
    this.mainScreen.picturesBtn.element.addEventListener('click', () =>
      this.handleViewChange('/pictures')
    );

    this.routes = [
      {
        path: '/',
        view: this.mainScreen,
      },
      {
        path: '/artists',
        view: this.artistsView,
      },
      {
        path: '/pictures',
        view: this.picturesView,
      },
      {
        path: '/settings',
        view: this.settingsView,
      },
    ];
  }

  renderCurrentView() {
    const currentRoute = this.routes.find((route) => route.path === window.location.pathname);
    currentRoute.view.render();
  }

  handleViewChange(routePath) {
    apdateHistoryState(routePath);
    this.renderCurrentView();
  }
}

export default App;
