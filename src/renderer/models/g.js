const { fromJS } = require('immutable');

const defaultState = fromJS({
  tabs: [
    {
      label: '发现音乐',
      id: 'find',
      pathname: '/home'
    },
    {
      label: '我的音乐',
      id: 'me',
      pathname: '/me'
    },
    {
      label: '测试其他功能',
      id: 'other',
      pathname: '/'
    }
  ]
});
export default {
  namespace: 'app',
  state: defaultState,
  reducers: {}
};
