import React, { Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import Feed from './components/Feed';
import './App.css';

function App() {
  let routes = (
    <Switch>
      <Route path="/" exact component={Feed} />
    </Switch>
  )
  return (
    <Fragment>
      {routes}
    </Fragment>
  );
}


export default withRouter(App);
