import State from '../../state/state';

function playAudio(audioSrc) {
  const audio = new Audio(audioSrc);

  audio.volume = Number(State.settings.audioVolume);
  audio.play();
}

export default playAudio;
