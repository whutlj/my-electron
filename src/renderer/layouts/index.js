import Head from '@/components/head/Index.js';
import LoginModal from '@/components/login/Index.js';
import { connect } from 'dva';

@connect(({ app, user }) => ({
  navTab: app.get('navTab'),
  tabs: app.get('tabs').toJS(),
  user: user.get('user'),
  loginVisible: user.get('loginVisible')
}))
class BasicLayout extends React.PureComponent {
  render() {
    const {
      navTab,
      tabs,
      children,
      location: { pathname },
      loginVisible
    } = this.props;
    return (
      <div className="g-wrapper">
        <Head pathname={pathname} {...this.props} />
        <LoginModal {...this.props} visible={loginVisible} />
        {children}
      </div>
    );
  }
}

export default BasicLayout;
