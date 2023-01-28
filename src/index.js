import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import SearchBarProvider from './context/SearchBarProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <SearchBarProvider>
        <App />
      </SearchBarProvider>
    </BrowserRouter>,
  );

serviceWorker.unregister();
