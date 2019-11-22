import React from 'react';
import { get } from '@api/fetch.js';
import styles from './songList.less';
import classnames from 'classnames';
import { connect } from 'dva';

@connect(({ playlist }) => ({
  hotList: playlist.get('hot'),
  playlists: playlist.get('playlists')
}))
class SongList extends React.PureComponent {
  componentDidMount() {
    this.fetchPlayListhHot();
    this.playlist();
  }

  fetchPlayListhHot = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'playlist/fetchHot'
    });
  };
  playlist = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'playlist/fetchlist'
    });
  };
  render() {
    let { hotList, playlists } = this.props;
    let limit = 4;
    hotList = hotList.slice(0, limit);
    return (
      <div className={classnames(styles['song-list'], 'home-list')}>
        <div className="title-item index-img f-cb">
          <a href="#" className="fl">
            热门推荐
          </a>
          <div className="sl-tab">
            {hotList.map((item, index) => (
              <React.Fragment key={item.id}>
                <a href="#" className="sl-tab-a">
                  {item.name}
                </a>
                {index === limit - 1 ? null : <span className="sl-sp">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <ul className="sl-list f-cb">
          {playlists.map(item => (
            <li className="sl-list-li" key={item.id}>
              <div className="sl-cover">
                <img src={item.coverImgUrl} alt="热门歌单" />
                <div className="sl-cover-mask coverall-img">
                  <span className="icon-img p_1"></span>
                  <span className="sl-pc">{item.playCount}万</span>
                </div>
              </div>
              <div className="sl-name">{item.name}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SongList;
