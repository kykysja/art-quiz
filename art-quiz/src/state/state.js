import getData from '../api/data';
import {
  DEFAULT_AUDIO_VOLUME_IN_PERCENTS,
  DEFAULT_TIME_TO_ANSWER,
  NUMBER_OF_ONE_CATEGORY_QUESTIONS,
  NUMBER_OF_QUIZ_QUESTIONS,
} from '../consts/base';
import { getFromLocalStorage } from '../shared/local-storage/local-storage';

const State = {
  artists: getFromLocalStorage('art-quiz-app-artists-quizzes') || [],
  pictures: getFromLocalStorage('art-quiz-app-pictures-quizzes') || [],
  authors: getFromLocalStorage('art-quiz-app-authors') || [],
  fullData: getFromLocalStorage('art-quiz-app-full-data') || [],
  settings: getFromLocalStorage('art-quiz-app-settings') || {},

  async setCategoryQuizzes(categoryName) {
    const data = await getData(`${categoryName}`);

    for (let i = 0; i < data.length; i += NUMBER_OF_QUIZ_QUESTIONS) {
      const quizNum = i / NUMBER_OF_QUIZ_QUESTIONS + 1;

      if (categoryName === 'artists')
        this.artists.push({
          quizNum,
          isPlayed: false,
          imageNum: i,
          questions: [],
        });
      else if (categoryName === 'pictures')
        this.pictures.push({
          quizNum,
          isPlayed: false,
          imageNum: i + NUMBER_OF_ONE_CATEGORY_QUESTIONS,
          questions: [],
        });

      for (let q = i; q < i + NUMBER_OF_QUIZ_QUESTIONS; q += 1) {
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

  async setFullData() {
    const data = await getData('data');

    for (let i = 0; i < data.length; i += 1) {
      this.fullData.push(data[i]);
    }
  },

  setSettings() {
    this.settings.timeGame = false;
    this.settings.timeToAnswer = DEFAULT_TIME_TO_ANSWER;
    this.settings.audioVolume = DEFAULT_AUDIO_VOLUME_IN_PERCENTS / 100;
  },

  async setState() {
    if (!this.artists.length) await this.setCategoryQuizzes('artists');
    if (!this.pictures.length) await this.setCategoryQuizzes('pictures');
    if (!this.authors.length) await this.setAuthors();
    if (!this.fullData.length) await this.setFullData();
    if (!this.settings.timeGame) this.setSettings();
  },
};

export default State;
