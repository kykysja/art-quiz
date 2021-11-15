import renderCurrentView from './router/router';

window.addEventListener('hashchange', renderCurrentView);
window.addEventListener('load', renderCurrentView);
