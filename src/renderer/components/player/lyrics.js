import React from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import memoizeOne from 'memoize-one';
import { replaceSep, isValidTime, throttle } from '@utils';

function parseLyrics(lyric) {
  if (!lyric) return [];
  const res = lyric.split(/[\r\n]/);
  return res
    .map(item => {
      if (!item) return;
      const res = item.split(']');
      const time = res[0].replace('[', '').trim();
      const content = res[1].trim();
      if (!isValidTime(time)) return;
      return { time, content };
    })
    .filter(_c => !!_c);
}
const handleLyric = memoizeOne(parseLyrics);
@connect(({ play }) => ({
  lyricInfo: play.get('lyricInfo'),
  visible: play.get('lyricVisible')
}))
class Lyrics extends React.Component {
  state = {
    formatLyric: [],
    id: '',
    currentIndex: 0
  };
  boxEl = null;
  transferEl = null;
  moveFlag = false;
  static getDerivedStateFromProps(props, state) {
    const { currentTime, lyricInfo } = props;
    let { id, formatLyric } = state;
    // 找到当前是哪一行
    const lyric = lyricInfo.get('lyric');
    const lyricId = lyricInfo.get('id');
    if (id && lyricId === id) {
      // 已经获取到格式化歌词,设置滚动和颜色
      let index = -1;
      let dCurrentTime = replaceSep(`${currentTime}.000`);
      const len = formatLyric.length;
      for (let i = 0; i < len; i++) {
        const item = formatLyric[i];
        const time = replaceSep(item.time);
        if (i === len - 1) {
          // 最后一个
          index = len;
          break;
        }
        if (time > dCurrentTime) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        return {
          currentIndex: index - 1
        };
      }
    } else if (lyricId !== id) {
      // 格式化歌词
      formatLyric = handleLyric(lyric);
      return {
        id: lyricId,
        formatLyric
      };
    }
    return null;
  }
  computedTranslateY = () => {
    const liHeight = 24;
    const { currentIndex } = this.state;
    if (currentIndex > 4) {
      const { offsetHeight } = this.boxEl;
      const diff = currentIndex * liHeight - offsetHeight / 2;
      if (diff > 0) {
        return diff;
      }
    }
    return 0;
  };
  onMouseDown = event => {
    this.moveFlag = true;
    const { clientY, clientX } = event;
    this.startY = clientY;
    this.startX = clientX;
    const translateY = this.transferEl.style.transform;
    let startTranslate = 0;
    if (translateY.match(/(\d+)/)) {
      startTranslate = RegExp.$1;
    }
    this.startTranslate = startTranslate;
  };
  onMouseMove = throttle(event => {
    event.persist();
    const { clientY, clientX } = event;
    if (!this.moveFlag || Math.abs(this.startX - clientX) > Math.abs(this.startY - clientY)) return;
    const diff = clientY - this.startY;
    let resY = 0;
    if (diff >= 0) {
      // 往下拉
      resY = -this.startTranslate + diff;
    } else {
      // 往上
      resY = -this.startTranslate + diff;
    }
    resY > 0 && (resY = 0);
    this.transferEl.style.transform = `translateY(${resY}px)`;
  }, 100);
  onMouseUp = event => {
    this.moveFlag = false;
  };
  onMouseLeave = () => {
    this.moveFlag = false;
  };
  render() {
    const { visible } = this.props;
    const { formatLyric, currentIndex } = this.state;
    const translateY = this.computedTranslateY();
    return (
      <div className={classnames(['lyrics-wrapper', { visible: visible }])}>
        <div
          className="lyrics-box"
          ref={el => (this.boxEl = el)}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onMouseLeave={this.onMouseLeave}
          onMouseOut={this.onMouseOut}
        >
          <ul className="lyrics-ul" ref={el => (this.transferEl = el)} style={{ transform: `translateY(-${translateY}px)` }}>
            {formatLyric.map((item, index) => (
              <li className={classnames('lyrics-li', { active: currentIndex === index })} data-time={item.time} key={item.time}>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Lyrics;
