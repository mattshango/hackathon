import { applyMiddleware, compose, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import React from 'react'
import Helmet from 'react-helmet'
import ReactDOM from 'react-dom'
import reducer from './ducks'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.css'

const history = createBrowserHistory()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  connectRouter(history)(reducer),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    ),
  ),
)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Helmet titleTemplate="Hackathon - %s" />
      <Routes history={history} />
    </div>
  </Provider>,
  document.getElementById('root')
)

