import React from 'react';
import { get } from '@api/fetch.js';
import styles from './topAlbum.less';
import classnames from 'classnames';
import Swiper from 'swiper';
import { connect } from 'dva';

@connect(({ playlist }) => ({
  topAlbum: playlist.get('topAlbum')
}))
class TopAlbum extends React.PureComponent {
  state = {
    isInitSwiper: false
  };
  componentDidMount() {
    this.initSwiper();
    this.fetchTopAlbum();
  }

  fetchTopAlbum = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'playlist/fetchTopAlbum',
      payload: {
        offset: 0,
        limit: 10
      }
    });
  };
  componentDidUpdate() {
    this.initSwiper();
  }
  initSwiper() {
    const { topAlbum } = this.props;
    const { isInitSwiper } = this.state;
    if (topAlbum.size > 0 && !isInitSwiper) {
      this.setState({
        isInitSwiper: true
      });
      new Swiper(`.${styles['swiper-container']}`, {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: false,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      });
    }
  }
  render() {
    const { topAlbum } = this.props;
    const slideOne = topAlbum.slice(0, 5);
    const slideTwo = topAlbum.slice(5, 10);
    const mapLists = [
      {
        type: 'one',
        list: slideOne
      },
      {
        type: 'two',
        list: slideTwo
      }
    ];
    return (
      <div className={classnames(styles['new-list'], 'home-list')}>
        <div className="title-item index-img">
          <a href="#" className="fl">
            新碟上架
          </a>
        </div>
        <div className="n-disk">
          <div className={classnames(styles['swiper-container'], 'swiper-container')}>
            <div className="swiper-wrapper">
              {mapLists.map(item => (
                <ul className="swiper-slide" key={item.type}>
                  <div className="n-inner">
                    {item.list.map(liItem => (
                      <li className="n-sli index-img" key={liItem.blurPicUrl}>
                        <div className="n-cover-img">
                          <img src={liItem.blurPicUrl} alt="" />
                          <div className="coverall-img n-disk-cover"></div>
                        </div>
                        <p className="f-hide">{liItem.name}</p>
                        <p className="f-hide">
                          <a href="#" className="n-inner-a1">
                            {liItem.artist.name}
                          </a>
                        </p>
                      </li>
                    ))}
                  </div>
                </ul>
              ))}
            </div>
            <div className="swiper-button-prev">
              <i className="index-img n-sw-l"></i>
            </div>
            <div className="swiper-button-next">
              <i className="index-img n-sw-r"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopAlbum;
