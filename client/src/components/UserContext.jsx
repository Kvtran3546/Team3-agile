import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function UserProvider({ children }) {
  // Initialize user state
  const [user, setUserState] = useState(null);

  // Retrieve user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    console.log(localStorage.getItem("userData"));
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // The setUser function allows updating the user and also saves it to localStorage
  const setUser = (newUser) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem("userData", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("userData");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
