// src/pages/Login.jsx
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import { AuthContext } from "../context/AuthContext"

const Login = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/users/login/", { username, password })
      setUser(res.data)
      navigate("/") // go to dashboard after login
    } catch (err) {
      console.error(err)
      setError("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Register Button */}
        <button
          onClick={() => navigate("/register")}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold"
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default Login
