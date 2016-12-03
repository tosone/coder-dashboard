import React from 'react';
import {Link, Navigation, List, ListItem, Button} from 'react-toolbox';
import {Router} from 'react-router';

class Index extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <aside>
          <List selectable>
            <ListItem key="456" caption="123" selectable onClick={() => {
              console.log(Router);
            }}/>
          </List>
        </aside>
        {this.props.children}
      </div>
    );
  }
}

export default Index;
