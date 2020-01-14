import React from 'react';

export default class Comp extends React.PureComponent {
  consoleName(name) {
    console.log(name);
  }
  componentDidUpdate() {
    console.log('Comp子组件更新');
  }
  render() {
    const { count } = this.props;
    return <div>子组件{count}</div>;
  }
}
