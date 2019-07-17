import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
import iconPath from '@img/icon.png';
import { isSupport } from '@utils';
import { ipcRenderer, clipboard } from 'electron';
import { message } from 'antd';
import { remote } from 'electron';

const { dialog } = remote;
@connect(({ app }) => ({
  g: app.g
}))
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: 'lj',
    inputValue: ''
  };
  componentWillMount() {
    ipcRenderer.on('async-one', (event, arg) => {
      console.log(arg);
    });
  }
  haha() {
    // 这是对象原型上的属性
    console.log('dd');
  }
  noticeInfo = () => {
    // 这是实例上的属性
    if (isSupport('Notification')) {
      Notification.requestPermission(permission => {
        if (permission === 'granted') {
          new Notification('花音提示你', {
            body: '花音提示内容'
            // icon: iconPath,
            // url: url,
            // tag: tag
          });
        }
      });
    }
  };

  sendSyncMsg = () => {
    const res = ipcRenderer.sendSync('sync-one', '渲染进程同步消息', '1');
    console.log('收到回复消息', res);
  };

  sendAsyncMsg = () => {
    ipcRenderer.send('async-one', '渲染进程异步消息', '1');
  };
  handleChange = e => {
    this.setState({
      inputValue: e.target.value.trim()
    });
  };

  clipInput = () => {
    if (this.state.inputValue === '') {
      return message.error('还未输入复制内容');
    }
    clipboard.writeText(this.state.inputValue);
    message.success('复制成功');
  };

  showDialog = (type) => {
    ipcRenderer.send('showDialog', {type});
  };
  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <input type="text" className={styles.textInput} onChange={this.handleChange} value={inputValue} />
        <div className={styles.btn} onClick={this.noticeInfo}>
          按钮
        </div>
        <div onClick={this.sendSyncMsg} className={styles.btn}>
          发送同步消息
        </div>
        <div onClick={this.sendAsyncMsg} className={styles.btn}>
          发送异步消息
        </div>
        <div onClick={this.showDialog.bind(this, 'open')} className={styles.btn}>
          显示open对话框
        </div>
        <div onClick={this.showDialog.bind(this, 'save')} className={styles.btn}>
          显示save对话框
        </div>
        <div className={styles.btn} onClick={this.clipInput}>
          复制输入内容
        </div>
      </div>
    );
  }
}

export default App;
