import { fromJS, List, Map } from 'immutable';
import { get, post } from '@api/fetch.js';

const defaultState = fromJS({
  hot: [],
  playlists: [],
  newPlaylists: [],
  topAlbum: [], // 新碟上架
  ranks: {
    bsPlaylist: { name: '云音乐飙升榜', list: [] },
    xgPlaylist: { name: '云音乐新歌榜', list: [] },
    ycPlaylist: { name: '网易原创歌曲榜', list: [] }
  }
});
export default {
  namespace: 'playlist',
  state: defaultState,
  reducers: {
    setHot(state, { payload }) {
      return state.set('hot', payload);
    },
    setPlaylist(state, { payload }) {
      return state.set('playlists', payload);
    },
    setNewPlaylist(state, { payload }) {
      return state.set('newPlaylists', payload);
    },
    setTopAlbum(state, { payload }) {
      return state.set('topAlbum', payload);
    },
    setRank(
      state,
      {
        payload: { bsPlaylist, xgPlaylist, ycPlaylist }
      }
    ) {
      const res = state
        .get('ranks')
        .updateIn(['bsPlaylist', 'list'], () => bsPlaylist)
        .updateIn(['xgPlaylist', 'list'], () => xgPlaylist)
        .updateIn(['ycPlaylist', 'list'], () => ycPlaylist);
      return state.set('ranks', res);
    }
  },
  effects: {
    *fetchHot(action, { call, put, select }) {
      // 热门歌单
      try {
        const hot = yield select(state => state.playlist.get('hot'));
        if (hot.size !== 0) return;
        const { tags = [] } = yield call(get, '/playlist/hot');
        yield put({
          type: 'setHot',
          payload: List(tags)
        });
      } catch (error) {
        console.error('获取热门歌单失败', error);
      }
    },
    *fetchlist(action, { call, put, select }) {
      // 热门推荐
      try {
        const listMap = yield select(state => state.playlist.get('playlists'));
        if (listMap.size !== 0) return;
        const { payload = { order: 'hot', limit: 8 } } = action;
        const params = {
          order: payload.order,
          limit: payload.limit
        };
        const { playlists = [] } = yield call(get, '/top/playlist', params);
        if (payload.order === 'hot') {
          yield put({
            type: 'setPlaylist',
            payload: List(playlists)
          });
        } else {
          yield put({
            type: 'setNewPlaylist',
            payload: List(playlists)
          });
        }
      } catch (error) {
        console.error('获取精选歌单失败', error);
      }
    },
    *fetchTopAlbum(action, { call, put, select }) {
      // 新碟上架
      try {
        const listMap = yield select(state => state.playlist.get('topAlbum'));

        if (listMap.size !== 0) return;
        const { payload = { offset: 0, limit: 30 } } = action;
        const params = {
          offset: payload.offset,
          limit: payload.limit
        };
        const { albums = [] } = yield call(get, '/top/album', params);
        yield put({
          type: 'setTopAlbum',
          payload: List(albums)
        });
      } catch (error) {
        console.error('获取新碟上架失败', error);
      }
    },
    *fetchTopList(action, { call, put, select }) {
      // 歌单排行榜
      try {
        const listMap = yield select(state => state.playlist.getIn(['ranks', 'xgPlaylist', 'list']));
        if (listMap.size !== 0) return;
        const idx = [
          {
            type: 'bs', // 飙升榜
            id: 3
          },
          {
            type: 'ng', // 新歌榜
            id: 0
          },
          {
            type: 'yc', // 原创榜
            id: 2
          }
        ];
        // 并发请求 /top/list idx
        let [
          {
            playlist: { tracks: bsPlaylist }
          },
          {
            playlist: { tracks: xgPlaylist }
          },
          {
            playlist: { tracks: ycPlaylist }
          }
        ] = yield call(fetchAll, idx);
        yield put({
          type: 'setRank',
          payload: {
            bsPlaylist: List(bsPlaylist.slice(0, 10)),
            xgPlaylist: List(xgPlaylist.slice(0, 10)),
            ycPlaylist: List(ycPlaylist.slice(0, 10))
          }
        });
      } catch (error) {
        console.error('获取榜单排行榜失败', error);
      }
    }
  }
};

function fetchAll(idx) {
  const promises = idx.map(item => {
    return get('/top/list', { idx: item.id });
  });
  return Promise.all(promises);
}
