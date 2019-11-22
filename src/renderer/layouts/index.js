import Head from '@/components/head/Index.js';
import LoginModal from '@/components/login/Index.js';
import Player from '@/components/player/Index.js';
import { connect } from 'dva';

@connect(({ app, user, play }) => ({
  navTab: app.get('navTab'),
  tabs: app.get('tabs'),
  user: user.get('user'),
  loginVisible: user.get('loginVisible')
}))
class BasicLayout extends React.PureComponent {
  render() {
    const {
      music,
      children,
      location: { pathname },
      loginVisible
    } = this.props;
    return (
      <div className="g-wrapper">
        <Head pathname={pathname} {...this.props} />
        <LoginModal {...this.props} visible={loginVisible} />
        {children}
        <Player></Player>
      </div>
    );
  }
}

export default BasicLayout;
