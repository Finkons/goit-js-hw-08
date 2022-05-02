
import throttle from 'lodash.throttle';


const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

let timeupdate = 0;

const onPlay = function (data) {
  console.log(data);
  timeupdate = data.seconds;
  localStorage.setItem('videoplayer-current-time', JSON.stringify({ timeupdate }));
};
player.on('timeupdate', throttle(onPlay, 1000));

const timeFromStorage = localStorage.getItem('videoplayer-current-time');

function checkForLocalstorageData() {
  if (timeFromStorage) {
    const parsedData = JSON.parse(timeFromStorage);
    player.setCurrentTime(parsedData.timeupdate);
  }
}
checkForLocalstorageData();