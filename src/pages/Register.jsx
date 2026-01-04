import { useState } from "react"
import api from "../api/axios"

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    instagram_username: "",
    instagram_url: "",
    custom_password: "",
    main_group: "",
    sub_group: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      await api.post("users/register/", formData)
      setSuccess("Registration successful. Please wait for approval.")
      setFormData({
        username: "",
        password: "",
        instagram_username: "",
        instagram_url: "",
        custom_password: "",
        main_group: "",
        sub_group: "",
      })
    } catch (err) {
      setError("Registration failed. Please check your inputs.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-500 font-medium">{error}</p>
        )}
        {success && (
          <p className="mb-4 text-center text-green-600 font-medium">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="input"
            required
          />

          {/* Password */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />

          {/* Instagram Username */}
          <input
            name="instagram_username"
            placeholder="Instagram Username"
            value={formData.instagram_username}
            onChange={handleChange}
            className="input"
            required
          />

          {/* Instagram URL */}
          <input
            name="instagram_url"
            placeholder="Instagram Profile URL"
            value={formData.instagram_url}
            onChange={handleChange}
            className="input"
            required
          />

          {/* System Password */}
          <input
            name="custom_password"
            placeholder="System Password"
            value={formData.custom_password}
            onChange={handleChange}
            className="input"
            required
          />

          {/* Group Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="main_group"
              placeholder="Main Group (A - J)"
              value={formData.main_group}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              name="sub_group"
              placeholder="Sub Group (e.g. B04)"
              value={formData.sub_group}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition duration-200 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          After registration, approval from admin is required.
        </p>
      </div>
    </div>
  )
}
