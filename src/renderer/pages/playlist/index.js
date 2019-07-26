import React from 'react';
import { connect } from 'dva';
import { get } from '@api/fetch.js';

@connect(({ user }) => ({
  user: user.get('user')
}))
class MyYy extends React.Component {
  componentWillMount() {
    this.fetchPlaylist();
  }

  fetchPlaylist = async () => {
    const res = await get('/personalized');
    console.log(res);
  };
  // fetchList = async () => {
  //   const { user } = this.props;
  //   if (user.loginType === 1) {
  //     const params = {
  //       uid: user.account.id
  //     };
  //     const res = await get('/user/playlist', params);
  //     console.log(res);
  //   }
  // };

  // componentDidUpdate(prevProps) {
  //   const { user: oldUser } = prevProps;
  //   const { user } = this.props;
  //   if (oldUser.loginType !== 1 && user.loginType === 1) {
  //     this.fetchList();
  //   }
  // }

  render() {
    return <div className="me-wrapper">111</div>;
  }
}

export default MyYy;
