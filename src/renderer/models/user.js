import { fromJS, Map } from 'immutable';
import { get, post } from '@api/fetch.js';

const defaultUser = {
  loginType: 1,
  code: 200,
  account: {
    id: 263760563,
    userName: '1_18582592878',
    type: 1,
    status: 0,
    whitelistAuthority: 0,
    createTime: 1460110621196,
    salt: '[B@1c87d4b2',
    tokenVersion: 0,
    ban: 0,
    baoyueVersion: 0,
    donateVersion: 0,
    vipType: 0,
    viptypeVersion: 0,
    anonimousUser: false
  },
  profile: {
    djStatus: 0,
    backgroundImgId: 18744474232249430,
    province: 420000,
    defaultAvatar: false,
    avatarUrl: 'https://p4.music.126.net/Oqjcy0Fdnt1sVdmrdse4VQ==/1376588564292855.jpg',
    experts: {},
    mutual: false,
    remarkName: null,
    expertTags: null,
    authStatus: 0,
    nickname: '武理小杰',
    birthday: -2209017600000,
    avatarImgId: 1376588564292855,
    userId: 263760563,
    vipType: 0,
    gender: 0,
    accountStatus: 0,
    backgroundUrl: 'https://p3.music.126.net/Q62ODLhIggUk0EzJBZIzOA==/18744474232249431.jpg',
    city: 420100,
    userType: 0,
    description: '',
    detailDescription: '',
    followed: false,
    avatarImgIdStr: '1376588564292855',
    backgroundImgIdStr: '18744474232249431',
    signature: '',
    authority: 0,
    followeds: 3,
    follows: 4,
    eventCount: 0,
    playlistCount: 4,
    playlistBeSubscribedCount: 0
  },
  bindings: [
    {
      userId: 263760563,
      expiresIn: 2147483647,
      tokenJsonStr: '{"countrycode":"","cellphone":"18582592878","hasPassword":true}',
      bindingTime: 1535161253175,
      url: '',
      expired: false,
      refreshTime: 1535161253,
      id: 6663455936,
      type: 1
    }
  ]
};
const defaultState = fromJS({
  user: {},
  loginVisible: false
});
export default {
  namespace: 'user',
  state: defaultState,
  reducers: {
    setUser(state, { payload }) {
      return state.set('user', payload);
    },
    setLoginVisible(state, { payload }) {
      return state.set('loginVisible', payload);
    }
  },
  effects: {
    *fetchLoginStatus(action, { call, put }) {
      try {
        const { profile = {} } = yield call(get, '/login/status');
        if (profile.userId) {
          const { avatarUrl, nickname, userId } = profile;
          yield put({
            type: 'setUser',
            payload: Map({
              avatarUrl,
              nickname,
              userId
            })
          });
        }
      } catch (error) {
        console.error('获取用户登录状态失败', error);
      }
    }
  }
};
