import { fromJS, Map } from 'immutable';
import { fetchMusic, fetchMusicDetail } from '@api';
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
  isInit: true // 页面第一次加载时不自动播放，只有当请求过新音乐时，才自动播放
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
    }
  },
  effects: {
    *fetchMusic({ payload }, { call, put, select, all }) {
      if (!payload || !payload.id) return;
      const currentMusic = yield select(state => state.play.getIn(['music', 'id']));
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
        console.log('333333')
        observer.$emit('playMusic', { isInit: false });
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
    }
  }
};
