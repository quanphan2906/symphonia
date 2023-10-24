import React, { createContext, useState } from "react";
import { login as supabaseLogin, signup as supabaseSignup } from "@/functions";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const signup = async (userData) => {
    const { data, error } = await supabaseSignup(
      userData.email,
      userData.password,
      userData.firstName,
      userData.lastName,
      userData.userAvatar
    );
    if (data) {
      setUser(data.user);
      return { success: true };
    }

    console.error(error);
    return { success: false, error };
  };

  const login = async (userData) => {
    // Simulate successful login
    const { data, error } = await supabaseLogin(
      userData.email,
      userData.password
    );
    if (data) {
      setUser(data.user);
      return { success: true };
    }

    console.error(error);
    return { success: false, error };
  };

  const logout = () => {
    // Simulate logout
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
