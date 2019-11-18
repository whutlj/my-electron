import React from 'react';
import { connect } from 'dva';
import Banner from '@/components/banner';
import SongList from './recommend/songList';
import styles from './index.less';

@connect()
class Home extends React.PureComponent {
  render() {
    return (
      <div className="recommend-wrapper">
        <Banner></Banner>
        <div className="p-box">
          <SongList></SongList>
        </div>
      </div>
    );
  }
}

export default Home;
