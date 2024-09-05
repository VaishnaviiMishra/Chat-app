import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../src/config/firebase";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [messagesId, setMessagesId] = useState([]);
  const [chatUser, setChatUser] = useState(null);
  
  const [userData, setUserData] = useState(null);
  const [chatsData, setChatsData] = useState([]);
  const [lastSeenIntervalId, setLastSeenIntervalId] = useState(null);

  // Function to load user data from Firestore
  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

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
      await updateDoc(userRef, { lastSeen: Date.now() });

      // Set up interval to update lastSeen periodically
      const intervalId = setInterval(async () => {
        if (auth.currentUser) {
          try {
            await updateDoc(userRef, { lastSeen: Date.now() });
          } catch (error) {
            console.error("Error updating last seen:", error);
          }
        }
      }, 60000);

      setLastSeenIntervalId(intervalId);

    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      const chatRef = doc(db, 'chats', userData.id);
      const unSub = onSnapshot(chatRef, async (res) => {
        const chatItems = res.data()?.chatsData || [];
        const tempData = await Promise.all(chatItems.map(async (item) => {
          const userRef = doc(db, 'users', item.rId);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();
          return { ...item, userData };
        }));

        setChatsData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
      });

      return () => {
        unSub();
      };
    }
  }, [userData]);

  useEffect(() => {
    return () => {
      if (lastSeenIntervalId) {
        clearInterval(lastSeenIntervalId);
      }
    };
  }, [lastSeenIntervalId]);

  const value = {
    userData,
    setUserData,
    chatsData,
    setChatsData,
    loadUserData,
    messages,
    setMessages,
    messagesId,
    setMessagesId,
    chatUser,
    setChatUser,  

  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;


