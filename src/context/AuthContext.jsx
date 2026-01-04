import { createContext, useEffect, useState } from "react";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token) {
      try {
        const decoded = jwtDecode(token); // you can use this if needed
        console.log("Decoded JWT:", decoded);

        api.get("/users/me") // backend endpoint must match this
          .then(res => setUser(res.data))
          .catch(err => {
            console.error("Failed to fetch user:", err);
            setUser(null);
          })
          .finally(() => setLoading(false));
      } catch (err) {
        console.error("Invalid token:", err);
        setUser(null);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
