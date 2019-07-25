import React from 'react';
import { hotList } from '@api/index';
import Link from 'umi/link';

class YyHome extends React.Component {
  async componentWillMount() {
    const res = await hotList();
  }

  render() {
    return (
      <div>首页</div>
    );
  }
}

export default YyHome;
