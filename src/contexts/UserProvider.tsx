import { createContext, useState } from 'react';

export const UserContext = createContext("");

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

const AuthProvider = ({ children }: Props) => {
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