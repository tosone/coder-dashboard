import React from 'react';
import {Link, Navigation, List, ListItem, Button} from 'react-toolbox';

class Index extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        {this.props.params.id}
      </div>
    );
  }
}

export default Index;
