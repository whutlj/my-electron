import Head from '@/components/Head/Head.js';
import { connect } from 'dva';

@connect(({ app }) => ({
  navTab: app.get('navTab'),
  tabs: app.get('tabs').toJS()
}))
class BasicLayout extends React.PureComponent {
  render() {
    const {
      navTab,
      tabs,
      children,
      location: { pathname }
    } = this.props;
    return (
      <div className="g-wrapper">
        <Head navTab={navTab} tabs={tabs} pathname={pathname} />
        {children}
      </div>
    );
  }
}

export default BasicLayout;
