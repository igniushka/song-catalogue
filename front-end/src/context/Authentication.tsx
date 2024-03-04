import { createContext, useState, useContext } from "react";

interface User {
    username?: string,
    password?: string
  }

interface AuthorisationContextType {
    user: User | undefined;
    setUser: (user: User | undefined) => void;
  }

export const AuthenticationContext = createContext<AuthorisationContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('useUser must be used within a AuthorisationProvider');
  }
  return context;
};

interface Props {
  children: any
}

export const AuthorisationProvider: React.FC<Props> = ({children}) => {
  const [user, setUser] = useState<User | undefined>(undefined)

  const contextValue = {
    user,
    setUser,
  };

  return(
  <AuthenticationContext.Provider value={contextValue}>
    {children}
    </AuthenticationContext.Provider>)

}