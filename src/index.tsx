// NOTE: index.tsx is the entry point for our app, this logic will run regardless of which page the user lands on.
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { setInitialEntryPoint } from './components/analytics/navigation/UserNavigation';

setInitialEntryPoint();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);