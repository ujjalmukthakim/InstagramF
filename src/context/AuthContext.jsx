import { createContext, useEffect, useState } from "react"
import api from "../api/axios"
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("access") // JWT token from login or superuser

    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Fetch actual user data from backend
        api.get("/users/me/", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setUser(res.data) // backend returns username, role, permissions, etc.
        })
        .catch(err => {
          console.error("Failed to fetch user:", err)
          setUser(null)
        })
        .finally(() => setLoading(false))
      } catch (err) {
        console.error("Invalid token:", err)
        setUser(null)
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
