import React from 'react';
import { connect } from 'dva';

@connect(({ app }) => ({
  g: app.g
}))
class App extends React.Component {
  render() {
    return <div>幻音</div>;
  }
}

export default App;
