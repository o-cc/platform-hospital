import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import api from 'api';
import qs from 'qs';
const query = qs.parse(window.location.search.slice(1));
let iCode = window.location.pathname.split('/')[2];
if (query.debug) {
  iCode = query.iCode || 'test';
}
api.setBaseUrl(iCode);

localStorage.setItem('vConsole_switch_y', window.innerHeight / 2 + '');

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
