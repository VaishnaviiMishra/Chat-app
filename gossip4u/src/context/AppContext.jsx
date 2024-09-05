import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { auth, db} from "../../src/config/firebase"; // Ensure correct import paths for auth and db

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  // Function to load user data from Firestore
  const loadUserData = async (uid) => {
    try {
      const UserRef = doc(db, 'users', uid);
      const userSnap = await getDoc(UserRef);
      
      if (!userSnap.exists()) {
        console.error("User does not exist in the database.");
        return;
      }

      const userData = userSnap.data();
      setUserData(userData);

      // Navigate based on the presence of avatar and name
      if (userData.avatar && userData.name) {
        navigate('/chat');
      } else {
        navigate('/profile');
      }

      // Update user's last seen timestamp
      await updateDoc(UserRef, {
        lastSeen: Date.now(),
      });

      // Set up interval to update lastSeen periodically
      const intervalId = setInterval(async () => {
        if (auth.currentUser) {
          try {
            await updateDoc(UserRef, {
              lastSeen: Date.now(),
            });
          } catch (error) {
            console.error("Error updating last seen:", error);
          }
        }
      }, 60000);

      // Cleanup interval on component unmount or when dependencies change
      return () => clearInterval(intervalId);
      
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  // Cleanup effect when AppContextProvider unmounts
  useEffect(() => {
    return () => clearInterval(); // Ensure intervals are cleaned up
  }, []);

  // Context value for consumption in other components
  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

