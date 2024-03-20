import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext.jsx';
import { TweetProvider } from './context/tweetContext.jsx';
import './index.css';
import ScrollToTop from './helpers/ScrollToTop.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <TweetProvider>
        <ScrollToTop />
        <App />
      </TweetProvider>
    </AuthProvider>
  </BrowserRouter>
);
