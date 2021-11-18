export function setToLocalStorage(key, value) {
  let stringifyValue;
  if (typeof value !== 'string') {
    stringifyValue = JSON.stringify(value);
  } else {
    stringifyValue = value;
  }
  localStorage.setItem(key, stringifyValue);
}

export function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
