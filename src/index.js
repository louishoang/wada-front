import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/containers/App';
import store from './stores';
import { Provider } from 'react-redux';

// Bootstrap and Jquery
import 'jquery';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';

// Stylesheet from template
import '../src/assets/css/default.css';
import '../src/assets/css/themestyle.css';
import '../src/assets/css/responsive.css';

// Custom Stylesheet
import '../src/assets/css/main.css';
import '../src/assets/css/react-datetime.css';


ReactDOM.render(
  <Provider store={store.configure(null)}>
    <App />
  </Provider>,
  document.getElementById('app')
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log('SW registered: ', registration); // eslint-disable-line no-console
      }
    }).catch(registrationError => {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log('SW registration failed: ', registrationError); // eslint-disable-line no-console
      }
    });
  });
}