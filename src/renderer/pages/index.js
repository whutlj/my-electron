import React from 'react';
import { connect } from 'dva';
import styles from '@css/global.css';
import iconPath from '@img/icon.png';
import { isSupport } from '@utils';

@connect(({ app }) => ({
  g: app.g
}))
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: 'lj'
  };
  noticeInfo = () => {
    if (isSupport('Notification')) {
      Notification.requestPermission(permission => {
        if (permission === 'granted') {
          new Notification('花音提示你', {
            body: '花音提示内容',
            // icon: iconPath,
            // url: url,
            // tag: tag
          });
        }
      });
    }
  };
  render() {
    return (
      <div>
        <div className={styles.btn} onClick={this.noticeInfo}>
          按钮
        </div>
        <div className="">{this.state.name}</div>
      </div>
    );
  }
}

export default App;
