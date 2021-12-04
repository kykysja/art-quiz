async function getData(dataName) {
  const res = await fetch(
    `https://raw.githubusercontent.com/kykysja/art-quiz-data/master/${dataName}.json`
  );

  const data = await res.json();

  return data;
}

export default getData;
