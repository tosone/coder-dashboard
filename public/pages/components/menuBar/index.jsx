import React from 'react';
import {AppBar} from 'react-toolbox';
import {Link} from 'react-router';

import Logo from '../logo';
import style from './style';

class MenuBar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <AppBar flat className={style.appBar}>
        <Logo/>
        <nav className={style.navigation}>
          <ul>
            <li>
              <Link activeClassName={style.active} to='console'>Console</Link>
            </li>
            <li>
              <Link activeClassName={style.active} to='/simulation'>Simulation</Link>
            </li>
          </ul>
        </nav>
      </AppBar>
    );
  }
}

export default MenuBar;
