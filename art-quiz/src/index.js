import App from './components/app';

const app = new App();
app.renderCurrentView();

window.addEventListener('popstate', () => {
  app.renderCurrentView();
});

export default app;
