import React from 'react';
import { connect } from 'dva';
import styles from './topList.less';
import classnames from 'classnames';

const ImageMap = {
  bsPlaylist: 'http://p4.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=100y100',
  xgPlaylist: 'http://p4.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=100y100',
  ycPlaylist: 'http://p4.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=100y100'
};

@connect(({ playlist }) => ({
  ranks: playlist.get('ranks')
}))
class TopList extends React.PureComponent {
  componentDidMount() {
    this.fetchTopList();
  }

  fetchTopList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'playlist/fetchTopList'
    });
  };
  onMouseOver = e => {
    e.currentTarget.className = 'hh';
  };
  onMouseOut = e => {
    e.currentTarget.className = '';
  };
  fetchMusic = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'play/fetchMusic',
      payload: {
        id
      }
    });
  };
  render() {
    let { ranks, fetchMusic } = this.props;
    console.log(fetchMusic);
    ranks = ranks.toJS();
    return (
      <div className={classnames(styles['top-list'], 'home-list')}>
        <div className="title-item index-img">
          <a href="#" className="fl">
            榜单
          </a>
        </div>
        <div className="n-rank f-cb bill-img">
          {Object.keys(ranks).map((rank, i) => (
            <React.Fragment key={rank}>
              <dl className={classnames('n-rank-list', { 'n-rank-list-1': i === 2 })}>
                <dt>
                  <div className="top">
                    <div className="n-rank-cover">
                      <img src={ImageMap[rank]} alt="" />
                    </div>
                    <div className="tit">{ranks[rank]['name']}</div>
                  </div>
                </dt>
                <dd>
                  <ol>
                    {ranks[rank]['list'].map((item, index) => (
                      <li className="n-rank-li" key={item.id} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                        <span className={classnames('op', { 'top-op': index < 3 })}>{index + 1}</span>
                        <span onClick={() => this.fetchMusic(item.id)}>{item.name}</span>
                      </li>
                    ))}
                  </ol>
                </dd>
              </dl>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default TopList;
