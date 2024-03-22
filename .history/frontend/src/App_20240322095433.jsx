import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import UserPage from './pages/UserPage/UserPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TweetPage from './pages/TweetPage/TweetPage';

function App() {
  console.log(process.argv);
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tweet/:id" element={<TweetPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user/:user" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;