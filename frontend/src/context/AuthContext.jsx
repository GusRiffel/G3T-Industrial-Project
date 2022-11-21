import { createContext, useEffect, useState } from "react";
import { getCookie } from "../utils/cookiesUtils";

export const UserContext = createContext({});

export const AuthContext = ({ children }) => {

  const [currentUser, setCurrentUser] = useState("");
  const [currentToken, setCurrentToken] = useState("");

  useEffect(() => {
    const cookieUser = getCookie();
    if (cookieUser) {
      setCurrentUser(cookieUser.user);
      setCurrentToken(cookieUser.accessToken)
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
        currentToken,
        createCurrentUser,
        deleteCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};