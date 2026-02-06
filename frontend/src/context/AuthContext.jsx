import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../api/auth.api";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGIN FUNCTION
  const login = async ({ email, password }) => {
    try {
      const data = await loginUser({ email, password });

      if (!data?.token || !data?.user) {
        throw new Error("Invalid login response from server");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      toast.success("Login successful");
      return data.user;
    } catch (error) {
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

  // LOAD USER ON REFRESH
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    toast.info("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
