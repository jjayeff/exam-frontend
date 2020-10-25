import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import commonConstant from './common/commonConstant';
import { history } from './helpers';
import './App.scss';

import { Chat } from './pages';

export default () => (
  <Router history={history}>
    <div className="App">
      <Switch>
        <Route
          sensitive
          strict
          exact
          path={commonConstant.pathChat}
          component={Chat}
        />
      </Switch>
    </div>
  </Router>
);
