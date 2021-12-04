export function getRandomNum(min, max) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);

  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

export function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export function generateImageURL(imageNum) {
  return `https://raw.githubusercontent.com/kykysja/art-quiz-data/master/img/${imageNum}.jpg`;
}
