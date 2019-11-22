import React from 'react';
import { connect } from 'dva';
import { get, post } from '@api/fetch.js';
import { cacheImageFactory } from '@/utils';
import classnames from 'classnames';
import Swiper from 'swiper';
import styles from './index.less';


const preloadImg = cacheImageFactory();
@connect()
class BannerComponent extends React.PureComponent {
  state = {
    banners: [],
    bannerIndex: 0
  };
  componentDidMount() {
    this.fetchBanner();
  }

  fetchBanner = async () => {
    try {
      const { dispatch } = this.props;
      const params = {
        type: 0 // 0 pc端
      };
      const { banners = [] } = await get('/banner', params);
      preloadImg(banners, { key: 'imageUrl', addPath: '?imageView&blur=40x20' });
      this.setState(
        {
          banners
        },
        () => {
          this.initSwiper();
        }
      );
    } catch (error) {
      console.error('fetch banner error', error);
    }
  };
  initSwiper() {
    const self = this;
    const len = self.state.banners.length;
    console.log('初始化', )
    new Swiper(`.${styles['swiper-container']}`, {
      direction: 'horizontal', // 垂直切换选项
      loop: true, // 循环模式选项
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      on: {
        slideChange: function() {
          let bannerIndex = 0;
          if (this.activeIndex === 0) {
            // 实际上是最大
            bannerIndex = len - 1;
          } else if (this.activeIndex <= len) {
            bannerIndex = this.activeIndex - 1;
          }
          self.setState({
            bannerIndex
          });
        }
      }
    });
  }
  render() {
    const { banners, bannerIndex } = this.state;
    return (
      <div
        className={styles['banner-container']}
        style={
          banners.length > 0
            ? {
                backgroundImage: `url(${banners[bannerIndex].imageUrl}?imageView&blur=40x20)`,
                backgroundPosition: 'center center',
                backgroundSize: '6000px'
              }
            : {}
        }
      >
        <div className="banner">
          <div className="banner-l">
            <div className={classnames(styles['swiper-container'], 'swiper-container')}>
              <div className="swiper-wrapper">
                {banners.map(banner => (
                  <div className="swiper-slide" key={banner.imageUrl}>
                    <img src={banner.imageUrl} alt="" className="banner-image" />
                  </div>
                ))}
              </div>
              <div className="swiper-pagination"></div>
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </div>
          </div>
          <div className="banner-r"></div>
        </div>
      </div>
    );
  }
}

export default BannerComponent;
