import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Adjust the path if your App component is in a different location
import './index.css'; // If you have global styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This should match the id in your HTML
);