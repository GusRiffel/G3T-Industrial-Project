import { createContext, useEffect, useState } from "react";
import { getCookie } from "../utils/cookiesUtils";

export const UserContext = createContext({});

export const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const cookieUser = getCookie();
    if (cookieUser) {
      setCurrentUser(cookieUser.user);
    }
  }, []);

  const createCurrentUser = (username) => {
    setCurrentUser(username);
  };

  const deleteCurrentUser = () => {
    setCurrentUser("");
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        createCurrentUser,
        deleteCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};