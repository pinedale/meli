import { createContext } from 'react';

export const UserContext = createContext("");

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

const AuthProvider = ({ children }: Props) => {

  return (
    <UserContext.Provider value="">
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;