// Disable no-unused-vars because we're just importing these to get the CSS and Bootstrap JS.
/* eslint-disable no-unused-vars */
import BOOTSTRAP_CSS from 'bootstrap/dist/css/bootstrap.css';
import MAIN_CSS from './styles/main.css';

import BOOTSTRAP_JS from 'bootstrap/dist/js/bootstrap.min';
/* eslint-enable no-unused-vars */

import React from 'react';
import ReactDOM from 'react-dom';
import Page from './components/page/component.js';

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
