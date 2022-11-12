import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import {BrowserRouter as Router} from 'react-router-dom';

import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./assets/css/tailwind.css";

const element = (
  <Router>
    <App />
  </Router>
);

const container = document.getElementById('root');
ReactDOM.render(element, container);

serviceWorker.unregister();
