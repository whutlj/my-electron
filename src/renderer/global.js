import eventInstance from '@js/event.js';
// import router from 'umi/router';

window.addEventListener('online', () => {
  console.log('有网');
})

window.addEventListener('offline', () => {
  console.log('断网');
})

console.log(process.versions.chrome);
eventInstance.initEvent();