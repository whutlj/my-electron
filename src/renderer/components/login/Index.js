import React from 'react';
import { Modal, Input, Button } from 'antd';
import { get, post } from '@api/fetch.js';
import styles from './index.less';

class LoginModal extends React.PureComponent {
  state = {
    phone: '',
    password: '',
    errMsg: ''
  };

  handleOk = () => {
    console.log('handle ok');
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    this.setState({
      phone: '',
      password: '',
      errMsg: ''
    });
    dispatch({
      type: 'user/setLoginVisible',
      payload: false
    });
  };
  phoneChange = e => {
    this.setState({
      phone: e.target.value.trim()
    });
  };
  passChange = e => {
    this.setState({
      password: e.target.value.trim()
    });
  };

  login = async () => {
    const { dispatch } = this.props;
    const { phone, password } = this.state;
    const params = {
      phone,
      password
    };
    try {
      const res = await get('/login/cellphone', params);
      dispatch({
        type: 'user/setUser',
        payload: res
      });
      dispatch({
        type: 'user/setLoginVisible',
        payload: false
      });
    } catch (err) {
      this.setState({
        errMsg: '用户名或密码错误'
      });
    }
  };
  render() {
    const { phone, password, errMsg } = this.state;
    const { visible } = this.props;
    return (
      <Modal title="登录" width={530} visible={visible} onOk={this.handleOk} footer={null} onCancel={this.handleCancel}>
        <div className={styles.box}>
          <Input placeholder="请输入手机号" value={phone} onChange={this.phoneChange} />
          <Input placeholder="请输入密码" type="password" value={password} onChange={this.passChange} />
          {errMsg ? <div className={styles.error}>{errMsg}</div> : null}
          <Button type="primary" onClick={this.login}>
            登录
          </Button>
        </div>
      </Modal>
    );
  }
}

export default LoginModal;
