// Disable no-unused-vars because we're just importing these to get the CSS and Bootstrap JS.
/* eslint-disable no-unused-vars */
import BOOTSTRAP_CSS from 'bootstrap/dist/css/bootstrap.css';
import MAIN_CSS from './styles/main.css';

import BOOTSTRAP_JS from 'bootstrap/dist/js/bootstrap.min';
/* eslint-enable no-unused-vars */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from './reducers/app.js';
import App from './components/app.js';
import CreateSchedulePage from './components/create-schedule-page.js';
import ViewSchedulePage from './components/view-schedule-page.js';

const appReducerWithRouting = combineReducers(Object.assign({}, reducers, {
  routing: routerReducer,
}));

const store = createStore(
  appReducerWithRouting,
  compose(
    applyMiddleware(
      routerMiddleware(browserHistory), // let us use history-related action creators
      thunkMiddleware // for dispatching async actions
    ),
    // TODO: Introduce devtime/production switch here
    window.devToolsExtension ? window.devToolsExtension() : noop => noop
  )
);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={CreateSchedulePage}/>
        <Route path="/schedules/:slug" component={ViewSchedulePage}/>
        {/* add an about page, eventually */}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
