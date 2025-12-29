import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    instagram_username: "",
    instagram_url: "",
    custom_password: "",
    main_group: "",
    sub_group: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("users/register/", formData);
      alert("Registration successful. Wait for approval.");
    } catch (err) {
      alert("Registration failed");
      console.log(err)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />

      <input name="instagram_username" placeholder="Instagram Username" onChange={handleChange} />
      <input name="instagram_url" placeholder="Instagram URL" onChange={handleChange} />

      <input name="custom_password" placeholder="System Password" onChange={handleChange} />

      <input name="main_group" placeholder="Main Group (A-J)" onChange={handleChange} />
      <input name="sub_group" placeholder="Sub Group (B04)" onChange={handleChange} />

      <button type="submit">Register</button>
    </form>
  );
}
