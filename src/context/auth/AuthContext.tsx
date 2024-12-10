import { createContext } from 'react'

interface User {
  id: string;
  name: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  userIsAuthenticated: () => boolean;
  userLogin: (user: User) => void;
  userLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)