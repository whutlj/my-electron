const MEDIA_ERR_ABORTED = 1;
const MEDIA_ERR_DECODE = 3;
const MEDIA_ERR_ENCRYPTED = 5;
const MEDIA_ERR_NETWORK = 2;
const MEDIA_ERR_SRC_NOT_SUPPORTED = 4;

export const LOCAL_PLAY_HISTORY = 'LOCAL_PLAY_HISTORY';

export const MEDIA_ERROR = {
  [MEDIA_ERR_ABORTED]: '音乐中断',

  [MEDIA_ERR_DECODE]: '解码错误',

  [MEDIA_ERR_ENCRYPTED]: '加密错误',

  [MEDIA_ERR_NETWORK]: '网络错误',

  [MEDIA_ERR_SRC_NOT_SUPPORTED]: '没有权限获取'
};

let safariLoaded = false;

function setSafariLoaded(val) {
  safariLoaded = val;
}
export { safariLoaded, setSafariLoaded };
