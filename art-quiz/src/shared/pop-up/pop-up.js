export function renderPopUp(popUp) {
  document.querySelector('#root').prepend(popUp.element);
}

export function closePopUp() {
  document.querySelector('.overlay').remove();
}
