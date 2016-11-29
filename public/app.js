import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Index from './pages/index';
import Console from './pages/console/index';
import Simulation from './pages/simulation/index';
import SimulationTest from './pages/simulationTest';
import NoMatch from './pages/nomatch/index';
import Dashboard from './pages/dashboard';
injectTapEventPlugin();
render(
  <Router history={hashHistory}>
  <Route path="/" component={Index}>
    <Route path="/console" component={Console}>
      <Route path="/console/:id" component={Dashboard}/>
    </Route>
    <Route path="/simulation" component={Simulation}>
      <Route path="/simulation/:id" component={SimulationTest}/>
    </Route>
    <Route path="*" component={NoMatch}/>
  </Route>
</Router>, document.getElementById('app'));

