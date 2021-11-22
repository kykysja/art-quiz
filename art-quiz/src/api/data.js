export async function getData(dataName) {
  const res = await fetch(
    `https://raw.githubusercontent.com/kykysja/art-quiz-data/master/${dataName}.json`
  );

  const data = await res.json();

  return data;
}

export async function getImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not load image'));
  });
}
