import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import UserPage from './pages/UserPage/UserPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TweetPage from './pages/TweetPage/TweetPage';
import TrendingPage from './pages/TrendingPage/TrendingPage';
import TopUsersPage from './pages/TopUsersPage/TopUsersPage';
import PrivateMessagePage from './pages/PrivateMessagePage/PrivateMessagePage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';

function App() {
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
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/profile/messages" element={<PrivateMessagePage />} />
        <Route path="/tweet/:id" element={<TweetPage />} />
        <Route path="/tops" element={<TopUsersPage />} />
        <Route path="/trendings" element={<TrendingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user/:user" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
