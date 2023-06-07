import React, { createContext, useState } from 'react';

export const UserContext = createContext("");

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()


  const userInfo = {
    user,
    setUser,
  };


  return (
    <UserContext.Provider value={userInfo}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;