import React from 'react';
import { hotList } from '@api/index';
import Link from 'umi/link';

class YyHome extends React.Component {
  async componentWillMount() {
    const res = await hotList();
    console.log(res);
  }

  render() {
    return <div>音乐首页
      <Link to="/">首页</Link>
    </div>;
  }
}

export default YyHome;
