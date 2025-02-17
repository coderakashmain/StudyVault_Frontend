import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ErrorBoundary from './Component/ErrorBoundary/ErrorBoundary.jsx';
import IntroLoader from './Component/IntroLoader/IntroLoader.jsx';


const removeLoader = () => {
  const loader = document.getElementById('static-loader');
  if (loader) {
    loader.style.transition = 'opacity 0.5s';
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.remove();
    }, 500); // Matches the transition duration
  }
};


ReactDOM.createRoot(document.getElementById('root')).render(


  <ErrorBoundary>
    <Suspense fallback={<IntroLoader />}>
      <App />
    </Suspense>
  </ErrorBoundary>

)
removeLoader()
