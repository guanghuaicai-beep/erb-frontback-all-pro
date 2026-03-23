import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [firstname, setFirstname] = useState(localStorage.getItem("firstname"));

  const signIn = (token, firstname) => {
    localStorage.setItem("token", token);
    localStorage.setItem("firstname", firstname);
    setToken(token);
    setFirstname(firstname);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstname");
    setToken(null);
    setFirstname(null);
  };

  return (
    <AuthContext.Provider value={{ token, firstname, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
