import React from 'react';
import ReactDOM from 'react-dom/client';
import {TabContainer} from './TabContainer';
import './apiConfig'; // sets OpenAPI.BASE dynamically


import "./font.css";
import "./index.css";
const root = ReactDOM.createRoot(
  document.getElementById('root')! // <-- the '!' tells TS it's not null
);
root.render(
  <React.StrictMode>
    <TabContainer />
  </React.StrictMode>
);
