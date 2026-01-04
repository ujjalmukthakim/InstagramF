import { NavLink, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const MainLayout = ({ children }) => {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    setUser(null)
    navigate("/login")
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/" className="hover:bg-gray-700 p-2 rounded">Home</NavLink>
          {user.permissions.can_book && (
            <NavLink to="/booking" className="hover:bg-gray-700 p-2 rounded">Booking</NavLink>
          )}
          {["DELTA", "CODE"].includes(user.role) && (
            <NavLink to="/activity" className="hover:bg-gray-700 p-2 rounded">Activity</NavLink>
          )}
          {["CEO","DIRECTOR","DELTA","CODE"].includes(user.role) && (
            <NavLink to="/approvals" className="hover:bg-gray-700 p-2 rounded">Approvals</NavLink>
          )}
          {["CEO","DIRECTOR","DELTA"].includes(user.role) && (
            <NavLink to="/groups" className="hover:bg-gray-700 p-2 rounded">Groups</NavLink>
          )}
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 hover:bg-red-600 p-2 rounded"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6">{children}</div>
    </div>
  )
}

export default MainLayout
