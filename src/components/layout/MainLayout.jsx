import { NavLink, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const MainLayout = ({ children }) => {
  const { user, setUser, loading } = useContext(AuthContext) // Assuming you have a loading state
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    setUser(null)
    navigate("/login")
  }

  // 1. ADD A GUARD: This prevents the crash if the user is null
  if (!user && !loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-500 mb-4">Session expired or unauthorized.</p>
          <button 
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/" className="hover:bg-gray-700 p-2 rounded">Home</NavLink>
          
          {/* 2. PROTECT PERMISSIONS: Added ?. to prevent "undefined" error */}
          {user?.permissions?.can_book && (
            <NavLink to="/booking" className="hover:bg-gray-700 p-2 rounded">Booking</NavLink>
          )}

          {/* 3. PROTECT ROLES: Added ?. before .role */}
          {["DELTA", "CODE"].includes(user?.role) && (
            <NavLink to="/activity" className="hover:bg-gray-700 p-2 rounded">Activity</NavLink>
          )}

          {["CEO","DIRECTOR","DELTA","CODE"].includes(user?.role) && (
            <NavLink to="/approvals" className="hover:bg-gray-700 p-2 rounded">Approvals</NavLink>
          )}

          {["CEO","DIRECTOR","DELTA"].includes(user?.role) && (
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