import React from 'react';

export default class ChildCom extends React.Component {
  state = {
    name: 'lj'
  };

  setName = () => {
    this.setState({
      name: 'new name'
    });
  };

  render() {
    console.log('childcom render');
    return (
      <div>
        <div onClick={this.setName}>设置name</div>
      </div>
    );
  }
}
