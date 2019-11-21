import { fromJS, Map } from 'immutable';
import { fetchMusic, fetchMusicDetail } from '@api';
const defaultState = fromJS({
  music: {
    id: '',
    url: '',
    name: '',
    albumName: '',
    albumPicUrl: '',
    artistName: ''
  },
  playHistory: []
});
export default {
  namespace: 'play',
  state: defaultState,
  reducers: {
    setMusic(state, { payload }) {
      return state.set('music', payload);
    }
  },
  effects: {
    *fetchMusic({ payload }, { call, put, select, all }) {
      if (!payload || !payload.id) return;
      const currentMusic = yield select(state => state.play.getIn(['music', 'id']));
      const { id } = payload;
      if (currentMusic && currentMusic === id) return;
      // 还需要并发获取歌曲详情，所以需要
      const { music, detail } = yield all({ music: call(fetchMusic, id), detail: call(fetchMusicDetail, id) });
      detail.albumPicUrl = `${detail.albumPicUrl}?param=45y45`;
      yield put({
        type: 'setMusic',
        payload: Map(Object.assign(music, detail))
      });
    }
  }
};
