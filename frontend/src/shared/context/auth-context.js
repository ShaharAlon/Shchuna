import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  loggedUser: 0,
  login: () => {},
  logout: () => {},
});
