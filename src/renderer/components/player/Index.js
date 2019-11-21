import React from 'react';
import styles from './index.less';
import clasnames from 'classnames';
import { connect } from 'dva';
import { message } from 'antd';

let vm = null;
@connect(({ play }) => ({
  music: play.get('music')
}))
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curId: '',
      isPlaying: false,
      curAlbumPicUrl: '',
      curAlbumName: '',
      curArtistName: '',
      url: '',
      audioCurrentTime: 0
    };
    vm = this;
    this.audioEl = React.createRef();
  }
  static getDerivedStateFromProps(props, state) {
    const { music } = props;
    const { curId } = state;
    const albumPicUrl = music.get('albumPicUrl');
    const id = music.get('id');
    if (curId === id) return null;
    const albumName = music.get('albumName');
    const artistName = music.get('artistName');
    const url = music.get('url');
    const picImage = new Image();
    picImage.onload = () => {
      vm.setState({
        curId: id,
        curAlbumName: albumName,
        curAlbumPicUrl: albumPicUrl,
        curArtistName: artistName,
        url,
        isPlaying: true
      });
    };
    picImage.src = albumPicUrl;
    return null;
  }
  shouldComponentUpdate(nextProps, nextStates) {
    const keys = ['isPlaying', 'audioCurrentTime'];
    for (let i = 0; i < keys.length; i++) {
      if (this.state[keys[i]] !== nextStates[keys[i]]) return true;
    }
    if (this.state.curId === nextStates.curId) return false;
    return true;
  }
  componentDidMount() {
    this.audioEl.current.addEventListener('error', this.audioErrorListener);
    this.audioEl.current.addEventListener('abort', this.audioAbortListener);
    this.audioEl.current.addEventListener('timeupdate', this.audioTimeupdateListener);
    this.audioEl.current.addEventListener('canplaythrough', this.audioCanplaythroughListener);
    this.audioEl.current.addEventListener('waiting', this.audioWaitingListener);
  }
  componentWillUnmount() {
    vm = null; // 解除
    this.audioEl.current.removeEventListener('abort', this.audioAbortListener);
    this.audioEl.current.removeEventListener('error', this.audioErrorListener);
    this.audioEl.current.removeEventListener('timeupdate', this.audioTimeupdateListener);
    this.audioEl.current.removeEventListener('canplaythrough', this.audioCanplaythroughListener);
    this.audioEl.current.removeEventListener('waiting', this.audioWaitingListener);
  }

  // 音频播放错误
  audioErrorListener = error => {
    console.error('播放音乐失败', error.type);
    if (!this.state.curId) return;
    this.setState({
      isPlaying: false
    });
    message.error('播放失败，请重新尝试！');
  };
  audioAbortListener = event => {
    console.log('abort');
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
        isPlaying: false
      });
    }
  };
  // 当用户代理可以播放媒体时，将触发该事件，并估计已加载足够的数据来播放媒体直到其结束，而无需停止以进一步缓冲内容
  audioCanplaythroughListener = () => {
    console.log('canplaythrough');
    this.audioEl.current.play();
    this.setState({
      isPlaying: true
    });
  };
  // 需要加载数据
  audioWaitingListener = () => {
    console.log('waiting');
  };
  playHandle = type => {
    if (type === 'play') {
      const { current } = this.audioEl;
      let isPlaying = false;
      if (current.paused) {
        current.play();
        isPlaying = true;
      } else {
        current.pause();
        isPlaying = false;
      }
      this.setState({
        isPlaying
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
    const { currentTarget, clientX, detail, pageX, offsetX } = event;
    const { offsetWidth, offsetLeft } = currentTarget;
    console.log(offsetX);
  };

  render() {
    const { isPlaying, curAlbumName, curAlbumPicUrl, curArtistName, audioCurrentTime, url } = this.state;
    // 必须要等到当前新播放的歌曲头像加载完成才更换链接和路径
    console.log('更新', url);
    return (
      <div className={styles.player}>
        <div className="play-box">
          <div className="play-handle">
            <div className="prev" title="上一首" onClick={this.playHandle.bind(this, 'prev')}></div>
            <div className={clasnames('play-btn', isPlaying ? 'play' : 'stop')} title="播发/暂停" onClick={this.playHandle.bind(this, 'play')}></div>
            <div className="next" title="下一首" onClick={this.playHandle.bind(this, 'next')}></div>
          </div>
          <div className="play-avatar">{curAlbumPicUrl ? <img src={curAlbumPicUrl} alt="" /> : null}</div>
          <div className="play-bar">
            <div className="info">
              <span className="album">{curAlbumName}</span>
              <span className="artist">{curArtistName}</span>
            </div>
            <div>
              <div className="bar" onClick={this.playJump}>
                <div className="bar-track load-bar"></div>
                <div className="bar-track cur-bar"></div>
              </div>
              <div className="time">{audioCurrentTime}/4:30</div>
            </div>
          </div>
          <div className="play-set"></div>
        </div>
        <audio src={url} style={{ display: 'none' }} ref={this.audioEl} controls></audio>
        {/* <audio src={url} className="audio" controls></audio> */}
      </div>
    );
  }
}

export default Player;
