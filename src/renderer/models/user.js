import { fromJS } from 'immutable';

const defaultState = fromJS({
  user: {
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
  },
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
  }
};
// MUSIC_U=d72f6643537b0899a88b3b1de0ba81167f3d7ee5747f98846fbfdf0d51668a64bccffc95187dac8dc9f8bc79d5028b407955a739ab43dce1; Expires=Sat, 30-Nov-2019 09:45:42 GMT; Path=/
// __remember_me=true; Expires=Sat, 30-Nov-2019 09:45:42 GMT; Path=/
// __csrf=a0c0bdc2c5aa32a4cbf9fb79818b45c1; Expires=Sat, 30-Nov-2019 09:45:52 GMT; Path=/
