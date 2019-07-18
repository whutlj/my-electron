import React from 'react';
import styles from './index.css';
import Link from 'umi/link';

class DragBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.dragEl = null;
  }
  componentDidMount() {
    this.dragEl.addEventListener('drop', this.dropHandle);
    this.dragEl.addEventListener('dragover', this.dragOverHandle);
  }
  componentWillUnmount() {
    this.dragEl.removeEventListener('drop', this.dropHandle);
    this.dragEl.removeEventListener('dragover', this.dragOverHandle);
  }
  dropHandle = e => {
    e.preventDefault();
    e.stopPropagation();

    for (const f of e.dataTransfer.files) {
      console.log('File(s) you dragged here: ', f.path);
    }
  };
  dragOverHandle = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  render() {
    return (
      <div>
        <div className={styles.dragBox} ref={el => (this.dragEl = el)}>
          <div className={styles.dragBtn}>拖拽添加</div>
        </div>
        <Link to="/" >首页</Link>
      </div>
    );
  }
}

export default DragBox;
