async function getData(dataName) {
  const baseUrl = 'https://raw.githubusercontent.com/kykysja/art-quiz-data/master/';

  const res = await fetch(`${baseUrl}${dataName}.json`);

  const data = await res.json();

  return data;
}

export default getData;
