import React from 'react';

import MenuBar from './components/menuBar';

class Index extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <MenuBar/> {this.props.children}
      </div>
    );
  }
}

export default Index;
