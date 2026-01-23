import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../api/auth.api";

import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async ({ email, password }) => {
    console.log("Logging in...");
    const data = await loginUser({ email, password });

    console.log(data, "in context");

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);

    return data.user;
  };



  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Logged out successfully"); 
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
