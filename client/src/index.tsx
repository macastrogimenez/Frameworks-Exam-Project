import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

/*
IMPORTANT by @macastrogimenez: this is our main page - remember this is a single-page application
in this page we will load all components, for now I have left the default sample component
named App, which can be found in the URL above, just for us to test and confirm 
everything is working for everybody.
*/ 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
