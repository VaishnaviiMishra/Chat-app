import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate';
import Chat from './pages/Chat/Chat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

const App = () => {
  const navigate = useNavigate(); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { 
      if (user) {
        navigate('/chat');
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]); 

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

