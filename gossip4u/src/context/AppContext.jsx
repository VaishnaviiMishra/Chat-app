import { createContext, useState } from "react";


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
  };

  return (
    <AppContext.Provider value={value}>
      {children} 
    </AppContext.Provider>
  );
};

export default AppContextProvider;
