import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import UserPage from './pages/UserPage/UserPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user/:user" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
