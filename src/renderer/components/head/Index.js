import React from 'react';
import Link from 'umi/link';
import classnames from 'classnames';

class Head extends React.PureComponent {
  componentDidMount() {
    this.init();
  }
  init = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchLoginStatus'
    });
  };
  login = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/setLoginVisible',
      payload: true
    });
  };
  render() {
    let { user, tabs, pathname } = this.props;
    const avatarUrl = user.get('avatarUrl');
    return (
      <div className="m-top">
        <div className="wrap f-cb">
          <h1 className="logo" />
          <ul className="m-nav">
            {tabs.map(tab => (
              <li key={tab.get('id')}>
                <span>
                  <Link to={tab.get('pathname')} className={pathname === tab.get('pathname') ? 'a_act' : ''}>
                    <em>{tab.get('label')}</em>
                  </Link>
                </span>
              </li>
            ))}
          </ul>
          <div className={classnames('log-b', { 'log-avatar': !!avatarUrl })}>
            {!!avatarUrl ? (
              <React.Fragment>
                <div className="user-avatar">
                  <img src={avatarUrl} alt="" />
                </div>
                <div className="log-list">
                  <ul>
                    <li>
                      <div className="log-w">我的主页</div>
                    </li>
                    <li className="ltb">
                      <div className="log-w">我的消息</div>
                    </li>
                  </ul>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="btn-n">登录</div>
                <div className="log-list">
                  <ul>
                    <li>
                      <div className="log-w" onClick={this.login}>
                        手机号登录
                      </div>
                    </li>
                    <li className="ltb">
                      <div className="log-w">邮箱登录</div>
                    </li>
                  </ul>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Head;
