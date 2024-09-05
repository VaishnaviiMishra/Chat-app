import { useEffect, useContext, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate';
import Chat from './pages/Chat/Chat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { AppContext } from './context/AppContext';

const App = () => {
  const navigate = useNavigate();
  const { loadUserData } = useContext(AppContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track authentication state

  useEffect(() => {
    const checkAuthStatus = async (user) => {
      try {
        if (user) {
          if (!isAuthenticated) {
            setIsAuthenticated(true);
            navigate('/chat');
            await loadUserData(user.uid); // Load user data when authenticated
          }
        } else {
          if (isAuthenticated !== false) {
            setIsAuthenticated(false);
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error); // Error handling
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      checkAuthStatus(user); // Check the authentication status
    });

    return () => unsubscribe();
  }, [navigate, loadUserData, isAuthenticated]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfileUpdate />} />
      </Routes>
    </>
  );
};

export default App;


