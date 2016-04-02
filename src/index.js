// Disable no-unused-vars because we're just importing SCSS.
// TODO: Investigate doing this not through the loader.
/* eslint-disable no-unused-vars */
import MAIN_CSS from './styles/index.scss';
/* eslint-enable no-unused-vars */

import Immutable from 'immutable';

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import appReducer from './reducers/app.js';
import App from './components/app.js';
import CreateSchedulePage from './components/create-schedule-page.js';
import ViewSchedulePage from './components/view-schedule-page.js';

const INITIAL_STATE = appReducer(Immutable.fromJS({}), { type: undefined });

const store = createStore(
  appReducer,
  INITIAL_STATE,
  compose(
    applyMiddleware(
      routerMiddleware(browserHistory), // let us use history-related action creators
      thunkMiddleware // for dispatching async actions
    ),
    // TODO: Introduce devtime/production switch here
    window.devToolsExtension ? window.devToolsExtension() : noop => noop
  )
);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => { return state.get('routing').toJS(); },
});

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
