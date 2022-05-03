
import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
})
let timeupdate = 0;

function saveСurrentTime(data) {
  console.log(data);
  timeupdate = data.seconds;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ timeupdate }));

  if (timeupdate === data.duration) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

player.on('timeupdate', throttle(saveСurrentTime, 1000));

const currentTime = localStorage.getItem(STORAGE_KEY);

player
  .setCurrentTime(currentTime)
  .then(function (seconds) {
    seconds = currentTime;
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        seconds <= 0;
        break;

      default:
        'OtherError'
        break;
    }
  });