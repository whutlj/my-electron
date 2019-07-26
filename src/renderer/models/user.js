import { fromJS } from 'immutable';

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
  }
};
