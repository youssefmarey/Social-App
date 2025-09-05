import React, { createContext, useEffect, useState } from "react";

export const authContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  function insertUserToken(tkn) {
    setToken(tkn);
  }

 

  useEffect(function() {
    if(localStorage.getItem("token") !== null) {
        setToken(localStorage.getItem("token"))
    }
  } , [])

   function logout(){
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <authContext.Provider
      value={{
        token,
        insertUserToken,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
