import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouting from './AppRouting'
import { HashRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <AppRouting />
  </HashRouter>
);

