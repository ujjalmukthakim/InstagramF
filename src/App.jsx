import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import WeeklyBooking from "./pages/WeeklyBooking"
import ActivityTracker from "./pages/ActivityTracker"
import Approvals from "./pages/ApprovalList"
import Groups from "./pages/Groups"

const App = () => {
  const { user, loading } = useContext(AuthContext)

  if (loading) return <p>Loading...</p>

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

        {/* Private */}
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />

        {user && ["CEO","DIRECTOR","DELTA"].includes(user.role) && (
          <Route path="/groups" element={<Groups />} />
        )}
        {user && ["DELTA","CODE"].includes(user.role) && (
          <Route path="/activity" element={<ActivityTracker />} />
        )}
        <Route path="/booking" element={user ? <WeeklyBooking /> : <Navigate to="/login" />} />
        {user && ["CEO","DIRECTOR","DELTA","CODE"].includes(user.role) && (
          <Route path="/approvals" element={<Approvals />} />
        )}

        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
