import { useState } from "react";
import api from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("users/login/", { username, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("status", res.data.status);

      window.location.href = "/dashboard";
    } catch {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
