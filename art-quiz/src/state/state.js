import getData from '../api/data';
import { getFromLocalStorage } from '../helpers/local-storage';

const State = {
  artists: getFromLocalStorage('art-quiz-app-artists-quizzes') || [],
  pictures: getFromLocalStorage('art-quiz-app-pictures-quizzes') || [],
  authors: getFromLocalStorage('art-quiz-app-authors') || [],
  imagesNums: getFromLocalStorage('art-quiz-app-imagesNums') || [],

  async setCategoryQuizzes(categoryName) {
    const data = await getData(`${categoryName}`);

    for (let i = 0; i < data.length; i += 10) {
      const quizNum = i / 10 + 1;

      if (categoryName === 'artists')
        this.artists.push({ quizNum, isPlayed: false, imageNum: i, questions: [] });
      else if (categoryName === 'pictures')
        this.pictures.push({ quizNum, isPlayed: false, imageNum: i + 120, questions: [] });

      for (let q = i; q < i + 10; q += 1) {
        if (categoryName === 'artists')
          this.artists[quizNum - 1].questions.push({ ...data[q], isCorrectAnswered: false });
        else if (categoryName === 'pictures')
          this.pictures[quizNum - 1].questions.push({ ...data[q], isCorrectAnswered: false });
      }
    }
  },

  async setAuthors() {
    const data = await getData('data');

    for (let i = 0; i < data.length; i += 1) {
      this.authors.push(data[i].author);
    }
  },

  async setImagesNums() {
    const data = await getData('data');

    for (let i = 0; i < data.length; i += 1) {
      this.imagesNums.push(data[i].imageNum);
    }
  },

  async setState() {
    if (!this.artists.length) await this.setCategoryQuizzes('artists');
    if (!this.pictures.length) await this.setCategoryQuizzes('pictures');
    if (!this.authors.length) await this.setAuthors();
    if (!this.imagesNums.length) await this.setImagesNums();
  },
};

export default State;
