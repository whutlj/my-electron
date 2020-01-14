import { fromJS } from 'immutable';
const defaultState = fromJS({
  tabs: [
    {
      label: '个性推荐',
      id: 'find',
      pathname: '/'
    },
    {
      label: '歌单',
      id: 'playlist',
      pathname: '/playlist'
    },
    {
      label: '主播电台',
      id: 'drag',
      pathname: '/drag'
    },
    {
      label: 'react hooks',
      id: 'hooks',
      pathname: '/hooks'
    }
  ]
});
export default {
  namespace: 'app',
  state: defaultState,
  reducers: {}
};
