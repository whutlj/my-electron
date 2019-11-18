import React from 'react';
import { get } from '@api/fetch.js';
import styles from './index.less';
import { connect } from 'dva';

@connect(({ playlist }) => ({
  hotList: playlist.get('hot')
}))
class SongList extends React.PureComponent {
  componentDidMount() {
    this.fetchPlayListhHot();
    this.playlist()
  }

  fetchPlayListhHot = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'playlist/fetchHot'
    });
  };
  playlist = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'playlist/fetchlist'
    })
  }
  render() {
    let { hotList } = this.props;
    let limit = 4;
    hotList = hotList.slice(0, limit);
    return (
      <div className={styles['song-list']}>
        <div className="title-item">
          <a href="#" className="fl sl-fl">
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
        <ul className="sl-list">
            <li className="sl-list-li"></li>
        </ul>
      </div>
    );
  }
}

export default SongList;
