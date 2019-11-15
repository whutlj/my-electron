import eventInstance from '@js/event.js';
import Cookie from 'js-cookie';
window.addEventListener('online', () => {
  console.log('有网');
});

window.addEventListener('offline', () => {
  console.log('断网');
});

eventInstance.initEvent();
Cookie.set('MUSIC_U', 'd72f6643537b0899a88b3b1de0ba8116e391184a3334472a3534d8283291a2285572ef48ae54dcd76e1fc7a5a56db8547955a739ab43dce1', { expires: 7 });
Cookie.set('__remember_me', true, { expires: 7 });
Cookie.set('__csrf', '62fa9f03e033436083b42ede2e1bdc2a', { expires: 7 });
