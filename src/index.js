import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const routedApp= <BrowserRouter basename={process.env.PUBLIC_URL}><App /></BrowserRouter>
ReactDOM.render(routedApp, document.getElementById('root'));

