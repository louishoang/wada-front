import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/containers/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/default.css';
import '../src/assets/css/themestyle.css';

// import '../../assets/css/font-awesome.min.css';
// import '../../assets/css/ionicons.min.css';
// import '../../assets/css/linearicons.css';
// import '../../assets/css/nice-select.css';
// import '../../assets/css/jquery.fancybox.css';
// import '../../assets/css/jquery-ui.min.css';
// import '../../assets/css/meanmenu.min.css';
// import '../../assets/css/nivo-slider.css';
// import '../../assets/css/owl.carousel.min.css';
// import '../../assets/css/bootstrap.min.css';
// import '../../assets/css/default.css';

// import '../../assets/css/nivo-slider.css';

// import '../../assets/css/responsive.css';

ReactDOM.render(<App />, document.getElementById('app'));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}