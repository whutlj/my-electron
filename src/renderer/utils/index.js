import { LOCAL_PLAY_HISTORY } from '@/config';
import { func } from 'prop-types';
export const isSupport = key => {
  return key in window;
};
const ua = window.navigator.userAgent.toLocaleLowerCase();
/**预加载图片 */
export const cacheImageFactory = () => {
  const savaImage = [];
  return function(imgs, options = {}) {
    const { key = '', addPath = '' } = options;
    if (Array.isArray(imgs)) {
      imgs.forEach(img => {
        const image = new Image();
        savaImage.push(image);
        image.src = key ? `${img[key]}${addPath}` : `${img}${addPath}`;
      });
    } else {
      const image = new Image();
      savaImage.push(image);
      image.src = key ? `${imgs[key]}${addPath}` : `${imgs}${addPath}`;
    }
  };
};

/**
 * 将秒转换为分显示
 */
export function getAudioTime(timeStamp, type) {
  let result = '00:00';
  if (!timeStamp) {
    return result;
  }
  let minutes = '' + ((timeStamp / 60) | 0);
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  let second = '' + (timeStamp % 60 | 0);
  if (second.length === 1) {
    second = `0${second}`;
  }
  return `${minutes}:${second}`;
}

// 储存播放记录
export function storePlayHistory(music) {
  try {
    let playHistory = JSON.parse(window.localStorage.getItem(LOCAL_PLAY_HISTORY));
    if (!playHistory) {
      playHistory = [];
    }
    let index = -1;
    for (let i = 0; i < playHistory.length; i++) {
      const item = playHistory[i];
      if (item.id === music.id) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      playHistory.push(music);
    } else {
      const cur = playHistory.splice(index, 1);
      playHistory.push(cur[0]);
    }
    if (playHistory.length > 50) {
      playHistory = playHistory.slice(1, playHistory.length);
    }
    window.localStorage.setItem(LOCAL_PLAY_HISTORY, JSON.stringify(playHistory));
  } catch (error) {
    console.error('操作播放记录失败', error);
  }
}

export function getStoreFirst() {
  let playHistory = JSON.parse(window.localStorage.getItem(LOCAL_PLAY_HISTORY));
  if (playHistory && playHistory.length > 0) {
    return playHistory[playHistory.length - 1];
  }
  return null;
}

export function isChrome() {
  return ua.includes('chrome');
}
export function isFirefox() {
  return ua.includes('firefox');
}
export function isSafari() {
  return !ua.includes('chrome') && ua.includes('safari');
}

export function replaceSep(str) {
  return str.replace(/[\.\:]/g, '');
}

export function isValidTime(str) {
  return /\d+\:\d+\.\d/.test(str);
}

export function throttle(fn, delay) {
  var now, lastExec, timer, context, args; //eslint-disable-line

  var execute = function() {
    fn.apply(context, args);
    lastExec = now;
  };

  return function(event) {
    event.persist()
    context = this;
    args = arguments;

    now = Date.now();

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (lastExec) {
      var diff = delay - (now - lastExec);
      if (diff < 0) {
        execute();
      } else {
        timer = setTimeout(() => {
          execute();
        }, diff);
      }
    } else {
      execute();
    }
  };
}
