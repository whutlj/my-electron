import React from 'react';
import { connect } from 'dva';
import Banner from '@/components/banner';

@connect()
class Home extends React.PureComponent {
  render() {
    return (
      <div className="recommend-wrapper">
        <Banner></Banner>
        <div className="p-box">

        </div>
      </div>
    );
  }
}

export default Home;
