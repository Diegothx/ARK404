import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './apiConfig'; // sets OpenAPI.BASE dynamically


const root = ReactDOM.createRoot(
  document.getElementById('root')! // <-- the '!' tells TS it's not null
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
