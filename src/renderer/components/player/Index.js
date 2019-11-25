import React from 'react';
import clasnames from 'classnames';
import { connect } from 'dva';
import { message } from 'antd';
import { getAudioTime, isChrome, isFirefox, isSafari } from '@utils';
import observer from '@utils/observer';
import styles from './index.less';
import memoizeOne from 'memoize-one';
import { MEDIA_ERROR, safariLoaded, setSafariLoaded } from '@/config';

let vm = null;
const getTotalTime = memoizeOne(getAudioTime);
@connect(({ play }) => ({
  music: play.get('music'),
  isInit: play.get('isInit')
}))
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curId: '',
      curName: '',
      curAlbumPicUrl: '',
      curAlbumName: '',
      curArtistName: '',
      url: '',
      audioCurrentTime: 0,
      audioWaiting: false,
      playStatus: false,
      progress: false,
      lyricVisible: true
    };
    vm = this;
    this.audioEl = React.createRef();
    this.barEl = null;
    this.isManual = false; // 手动点击不改变之前播放状态
  }
  static getDerivedStateFromProps(props, state) {
    const { music } = props;
    const { curId } = state;
    const albumPicUrl = music.get('albumPicUrl');
    const id = music.get('id');
    if (curId === id) return null;
    const albumName = music.get('albumName');
    const artistName = music.get('artistName');
    const name = music.get('name');
    const url = music.get('url');
    const picImage = new Image();
    picImage.onload = () => {
      vm.setState({
        curId: id,
        curName: name,
        curAlbumName: albumName,
        curAlbumPicUrl: albumPicUrl,
        curArtistName: artistName,
        url
      });
    };
    picImage.src = albumPicUrl;
    return null;
  }
  shouldComponentUpdate(nextProps, nextStates) {
    const keys = ['playStatus', 'lyricVisible', 'progress', 'audioCurrentTime', 'audioWaiting', 'url'];
    for (let i = 0; i < keys.length; i++) {
      if (this.state[keys[i]] !== nextStates[keys[i]]) return true;
    }
    if (this.state.curId === nextStates.curId) return false;
    return true;
  }
  componentDidMount() {
    if (isSafari()) {
      observer.$on('playMusic', () => {
        if (this.audioEl.current && !safariLoaded) {
          // safari必须要load一次
          console.log('load==========');
          setSafariLoaded(true);
          this.audioEl.current.load();
          this.audioEl.current.play();
        }
      });
    }
    this.barWidth = this.barEl.offsetWidth;
    this.barEl = null;
    this.audioEl.current.addEventListener('error', this.audioErrorListener);
    this.audioEl.current.addEventListener('abort', this.audioAbortListener);
    this.audioEl.current.addEventListener('timeupdate', this.audioTimeupdateListener);
    this.audioEl.current.addEventListener('canplaythrough', this.audioCanplaythroughListener);
    this.audioEl.current.addEventListener('canplay', this.audioCanplayListener);
    this.audioEl.current.addEventListener('waiting', this.audioWaitingListener);
    this.audioEl.current.addEventListener('progress', this.audioProgressListener);
    this.audioEl.current.addEventListener('loadstart', this.audioloadstartListener);
    this.audioEl.current.addEventListener('loadeddata', this.audioLoadeddataListener);
  }
  componentWillUnmount() {
    // vm = null; // 解除
    this.audioEl.current.removeEventListener('abort', this.audioAbortListener);
    this.audioEl.current.removeEventListener('error', this.audioErrorListener);
    this.audioEl.current.removeEventListener('timeupdate', this.audioTimeupdateListener);
    this.audioEl.current.removeEventListener('canplaythrough', this.audioCanplaythroughListener);
    this.audioEl.current.removeEventListener('canplay', this.audioCanplayListener);
    this.audioEl.current.removeEventListener('waiting', this.audioWaitingListener);
    this.audioEl.current.removeEventListener('progress', this.audioProgressListener);
    this.audioEl.current.removeEventListener('loadstart', this.audioloadstartListener);
    this.audioEl.current.removeEventListener('loadeddata', this.audioLoadeddataListener);
  }
  componentDidUpdate(preProps, preStates) {
    if (preStates.url !== this.state.url) {
      console.log('切换之前状态=====');
      this.isManual = false;
    }
  }
  // 当浏览器开始加载资源
  audioloadstartListener = () => {
    console.log('loadstart');
  };
  //当媒体当前播放位置的帧完成加载时
  audioLoadeddataListener = () => {
    console.log('loadeddata');
  };
  // 音频播放错误
  audioErrorListener = event => {
    if (!this.state.curId && this.props.isInit) return;
    this.setState({
      playStatus: false,
      audioWaiting: false
    });
    const { code } = event.currentTarget.error;
    message.error(MEDIA_ERROR[code] || '播放失败，请重新尝试！');
  };
  // 切换音乐时会触发
  audioAbortListener = event => {
    this.setState({
      audioCurrentTime: this.audioEl.current.currentTime
    });
  };
  // 浏览器加载资源
  audioProgressListener = event => {
    if (isSafari()) {
      this.setState({
        progress: !this.state.progress
      });
    }
  };
  // currentTime改变的事件
  audioTimeupdateListener = event => {
    const { audioCurrentTime } = this.state;
    const { current } = this.audioEl;
    const currentTime = Math.ceil(current.currentTime);
    if (audioCurrentTime !== currentTime) {
      this.setState({
        audioCurrentTime: currentTime
      });
    }
    if (current.ended) {
      this.setState({
        playStatus: !this.state.playStatus
      });
    }
  };
  // 当用户代理可以播放媒体时，将触发该事件，并估计已加载足够的数据来播放媒体直到其结束，而无需停止以进一步缓冲内容
  audioCanplaythroughListener = () => {
    console.log('canplaythrough');

    const { current } = this.audioEl;
    const { isInit } = this.props;
    let setting = { audioWaiting: false };
    const { playStatus } = this.state;
    console.log(isInit, current.paused, current.error);
    if (!isInit && current.paused && !current.error && !this.isManual) {
      // if (isChrome() || isFirefox()) {
      current.play();
      setting.playStatus = !playStatus;
    }
    this.setState(setting);
    // }
  };
  // 兼容safari，因为canplayThrough是在最后触发
  audioCanplayListener = () => {
    console.log('canplay');
  };
  // 需要加载数据
  audioWaitingListener = () => {
    console.log('waiting');
    this.setState({
      audioWaiting: true
    });
  };
  playHandle = type => {
    let { playStatus, url } = this.state;
    if (!url) return;
    if (type === 'play') {
      const { current } = this.audioEl;
      if (current.error) {
        playStatus = false;
      } else if (current.paused) {
        current.play();
        playStatus = !playStatus;
      } else {
        current.pause();
        playStatus = !playStatus;
      }
      this.setState({
        playStatus: playStatus
      });
      return;
    }
    if (type === 'prev') {
      return;
    }
    if (type === 'next') {
      return;
    }
  };

  playJump = event => {
    if (!this.state.url) return;
    const { currentTarget, clientX } = event;
    // 最好不要这样，但是没办法，左右边距会变
    const { left } = currentTarget.getBoundingClientRect();
    let diff = clientX - left;
    if (diff < 0) diff = 0;
    this.isManual = true;
    this.audioEl.current.currentTime = (diff / this.barWidth) * this.audioEl.current.duration;
  };
  toggleLyrics = () => {
    this.setState({
      lyricVisible: !this.state.lyricVisible
    });
  };

  render() {
    const { curAlbumName, lyricVisible, curName, curAlbumPicUrl, curArtistName, audioCurrentTime, url, audioWaiting } = this.state;
    // 必须要等到当前新播放的歌曲头像加载完成才更换链接和路径
    let duration = 0;
    let curBarWidth = 0;
    let bufferBarWidth = 0;
    const currentTime = getAudioTime(audioCurrentTime);
    const { current } = this.audioEl;
    let isPlaying = false;
    let isEnded = false;
    if (current) {
      isPlaying = !current.paused;
      isEnded = current.ended;
    }
    if (this.audioEl.current && this.audioEl.current.duration) {
      duration = Math.ceil(this.audioEl.current.duration);
      curBarWidth = (audioCurrentTime / duration) * this.barWidth;
      const { buffered } = this.audioEl.current;
      if (buffered.length > 0 && bufferBarWidth !== this.barWidth) {
        bufferBarWidth = (buffered.end(buffered.length - 1) / this.audioEl.current.duration) * this.barWidth;
        if (bufferBarWidth > this.barWidth) {
          bufferBarWidth = this.barWidth;
        }
      }
    }
    const totalTime = getTotalTime(duration);
    return (
      <div className={styles.player}>
        <div className="play-box">
          <div className="play-handle">
            <div className="prev" title="上一首" onClick={this.playHandle.bind(this, 'prev')}></div>
            <div className={clasnames('play-btn', isPlaying && !isEnded ? 'play' : 'stop')} title="播放/暂停" onClick={this.playHandle.bind(this, 'play')}></div>
            <div className="next" title="下一首" onClick={this.playHandle.bind(this, 'next')}></div>
          </div>
          <div className="play-avatar">{curAlbumPicUrl ? <img src={curAlbumPicUrl} alt="" /> : null}</div>
          <div className="play-bar">
            <div className="info">
              <span className="album">{curName || curAlbumName}</span>
              <span className="artist">{curArtistName}</span>
            </div>
            <div className="f-cb">
              <div className="bar" onClick={this.playJump} ref={el => (this.barEl = el)}>
                <div className="bar-set">
                  <div className="bar-track load-bar" style={{ width: bufferBarWidth }}></div>
                  <div className="bar-track cur-bar" style={{ width: curBarWidth }}>
                    <div className={`bar-btn${audioWaiting ? ' btn-loading' : ''}`}>
                      <i></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="time">
                {currentTime}/{totalTime}
              </div>
            </div>
          </div>
          <div className="play-set" onClick={this.toggleLyrics}>
            歌词
          </div>
          {lyricVisible ? <div className="lyrics-wrapper">我是歌词</div> : null}
        </div>
        <audio src={url} style={{ display: 'none' }} ref={this.audioEl}></audio>
        {/* <audio src={url} className="audio" controls></audio> */}
      </div>
    );
  }
}

export default Player;
