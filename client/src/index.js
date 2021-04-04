import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

import {Provider}  from "react-redux"
import {BrowserRouter as Router} from 'react-router-dom'
import store from "../src/Redux/Store/index"

ReactDOM.render(
  <Router>
    <Provider store={store}>

      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
