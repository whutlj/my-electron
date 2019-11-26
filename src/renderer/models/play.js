import { fromJS, Map } from 'immutable';
import { fetchMusic, fetchMusicDetail } from '@api';
import { get } from '@api/fetch';
import { storePlayHistory, getStoreFirst, isSafari } from '@utils';
import observer from '@utils/observer';
import { safariLoaded } from '@/config';

const safari = isSafari();
const defaultState = fromJS({
  music: getStoreFirst() || {
    id: '',
    url: '',
    name: '',
    albumName: '',
    albumPicUrl: '',
    artistName: '',
    duration: ''
  },
  isInit: true, // 页面第一次加载时不自动播放，只有当请求过新音乐时，才自动播放
  lyricInfo: {
    id: '',
    lyric: ''
  },
  lyricVisible: false
});
export default {
  namespace: 'play',
  state: defaultState,
  reducers: {
    setMusic(state, { payload }) {
      return state.set('music', payload);
    },
    setInit(state, { payload }) {
      return state.set('isInit', payload);
    },
    setLyric(state, { payload }) {
      return state.set('lyricInfo', payload);
    },
    setLyricVisible(state, { payload }) {
      return state.set('lyricVisible', payload);
    }
  },
  effects: {
    *fetchMusic({ payload }, { call, put, select, all, fork }) {
      if (!payload || !payload.id) return;
      const currentMusic = yield select(state => state.play.getIn(['music', 'id']));
      const lyricVisible = yield select(state => state.play.get('lyricVisible'));
      const { id } = payload;
      if (currentMusic && currentMusic === id) return;
      const isInit = yield select(state => state.play.get('isInit'));
      if (isInit) {
        yield put({
          type: 'setInit',
          payload: false
        });
      }
      if (!safariLoaded && safari) {
        observer.$emit('playMusic', { isInit: false });
      }
      // 歌词窗口是否打开
      if (lyricVisible) {
        yield fork(put, {
          type: 'fetchLyric',
          payload: { id }
        });
      }
      // 还需要并发获取歌曲详情，所以需要
      const { music, detail } = yield all({ music: call(fetchMusic, id), detail: call(fetchMusicDetail, id) });
      detail.albumPicUrl = `${detail.albumPicUrl}?param=45y45`;
      const res = Object.assign(music, detail);
      // 播放记录储存起来
      storePlayHistory(res);
      yield put({
        type: 'setMusic',
        payload: Map(res)
      });
    },
    *fetchLyric({ payload }, { call, put, select, fork }) {
      try {
        const { id } = payload;
        const currentId = yield select(state => state.play.getIn(['lyricInfo', 'id']));
        if (id === currentId) return;
        const {
          lrc: { lyric }
        } = yield call(get, '/lyric', { id });
        yield put({
          type: 'setLyric',
          payload: Map({
            id,
            lyric
          })
        });
      } catch (error) {
        console.log('获取歌词失败', error);
        yield put({
          type: 'setLyric',
          payload: Map({
            id: payload.id,
            lyric: ''
          })
        });
      }
    }
  }
};
