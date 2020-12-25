import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// BACKEND ENDPOINT BASE URL
//REACT_APP_API_URL=http://3.86.216.77:4000 npm start

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
