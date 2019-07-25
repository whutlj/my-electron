import React from 'react';
import Link from 'umi/link';

class Head extends React.PureComponent {
  render() {
    const { navTab, tabs, pathname } = this.props;
    return (
      <div className="m-top">
        <div className="wrap f-cb">
          <h1 className="logo" />
          <ul className="m-nav">
            {tabs.map(tab => (
              <li key={tab.id}>
                <span>
                  <Link to={tab.pathname} className={pathname === tab.pathname ? 'a_act' : ''}>
                    <em>{tab.label}</em>
                  </Link>
                </span>
              </li>
            ))}
          </ul>
          <div className="log-b">
            <div className="btn-n">登录</div>
            <div className="log-list">
              <ul>
                <li>
                  <div className="log-w">手机号登录</div>
                </li>
                <li className="ltb">
                  <div className="log-w">邮箱登录</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Head;
