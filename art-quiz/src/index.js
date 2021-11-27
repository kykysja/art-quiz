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
console.clear();

console.log(`
Важно:
- Настройки сохраняются только по клику на кнопку 'Сохранить'.

Самооценка 222/220:

1) Стартовая страница и навигация +20
2) Настройки +40
3) Страница категорий +30
4) Страница с вопросами +50
5) Страница с результатами +50 (открывается при клике на звездочку на сыгранном раунде)
6) Плавная смена изображений +10

7) Реализована анимация отдельных деталей интерфейса +20
   - анимация кнопок SETTINGS И SCORE
   - на карточках раундов анимировано появление кнопки PLAY
   - на странице результатов анимированы карточки (появление бордера и движение самой карточки)
   - анимация кнопок на начальном экране и странице с вопросами про художников
   - анимированы все кнопки модальных окон (увеличение размера о отбрасывание тени)

8) Дополнительный функционал на выбор +2:
   - разные уведомления по окончанию раунда в зависимости от результата +2
`);
