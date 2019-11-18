import { fromJS } from 'immutable';
import { get, post } from '@api/fetch.js';

const defaultState = fromJS({
  hot: []
});
export default {
  namespace: 'playlist',
  state: defaultState,
  reducers: {
    setHot(state, { payload }) {
      return state.set('hot', payload);
    }
  },
  effects: {
    *fetchHot(action, { call, put, select }) {
      try {
        const hot = yield select(state => state.playlist.get('hot'));
        if (hot.size !== 0) return;
        const { tags = [] } = yield call(get, '/playlist/hot');
        yield put({
          type: 'setHot',
          payload: tags
        });
      } catch (error) {
        console.error('获取热门歌单失败', error);
      }
    },
    *fetchlist(action, {call, put}) {
      try {
        
      } catch (error) {
        
      }
    }
  }
};
