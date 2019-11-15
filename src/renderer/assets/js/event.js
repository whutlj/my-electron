import { notification } from 'antd';
class RenderEvent {
  initEvent() {
    ipcRenderer.on('notice', (event, { type, message = '提示', description, duration = 2 }) => {
      if (['success', 'info', 'warn', 'error'].includes(type)) {
        notification[type]({
          message,
          description,
          duration
        });
      } else {
        console.error('提示弹框type有误，期望是["success", "info", "warn", "error"]');
      }
    });
    ipcRenderer.on('async-one', (event, arg) => {
      console.log(arg);
    })
  }
}

export default new RenderEvent();