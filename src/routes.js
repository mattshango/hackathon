import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import Home from './pages/Home'
import Login from './pages/Login'
import News from './pages/News'
import Register from './pages/Register'
import Sports from './pages/Sports'
import Tasks from './pages/Tasks'
import Photos from './pages/Photos'
import Clothes from './pages/Clothes'

export default ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/news' component={News} />
          <Route exact path='/sports' component={Sports} />
          <Route exact path='/tasks' component={Tasks} />
          <Route exact path='/photos' component={Photos} />
          <Route exact path='/clothes' component={Clothes} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/login/:callback' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route component={Home} />
        </Switch>
      </main>
    </ConnectedRouter>
  );
}