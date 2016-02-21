// Disable no-unused-vars because we're just importing these to get the CSS and Bootstrap JS.
/* eslint-disable no-unused-vars */
import BOOTSTRAP_CSS from 'bootstrap/dist/css/bootstrap.css';
import MAIN_CSS from './styles/main.css';

import BOOTSTRAP_JS from 'bootstrap/dist/js/bootstrap.min';
/* eslint-enable no-unused-vars */

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { app } from './reducers/app.js';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import App from './components/app.js';

const createStoreWithDevTools = window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore;
const store = createStore(
  app,
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
