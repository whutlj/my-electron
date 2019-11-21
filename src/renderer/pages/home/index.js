import React from 'react';
import { connect } from 'dva';
import Banner from '@/components/banner';
import SongList from './recommend/songList';
import TopAlbum from './recommend/topAlbum';
import TopList from './recommend/topList';
import styles from './index.less';

@connect()
class Home extends React.PureComponent {
  render() {
    return (
      <div className="recommend-wrapper">
        <Banner></Banner>
        <div className="discover-module f-cb">
          <div className="l-box">
            <div className="p-box">
              <div className="c-box">
                <SongList></SongList>
                <TopAlbum></TopAlbum>
                <TopList></TopList>
              </div>
            </div>
          </div>
          <div className="r-box"></div>
        </div>
      </div>
    );
  }
}

export default Home;
