import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"

import MainLayout from "./components/layout/MainLayout"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import WeeklyBooking from "./components/booking/WeeklyBooking"
import ActivityTracker from "./components/activity/ActivityTracker"
import ApprovalList from "./components/approval/ApprovalList"
import Groups from "./pages/Groups"

function App() {
  const { user, loading } = useContext(AuthContext)

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <BrowserRouter>
      {user ? (
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {user.permissions.can_book && (
              <Route path="/booking" element={<WeeklyBooking />} />
            )}
            {["DELTA", "CODE"].includes(user.role) && (
              <Route path="/activity" element={<ActivityTracker />} />
            )}
            {["CEO", "DIRECTOR", "DELTA", "CODE"].includes(user.role) && (
              <Route path="/approvals" element={<ApprovalList />} />
            )}
            {["CEO", "DIRECTOR", "DELTA"].includes(user.role) && (
              <Route path="/groups" element={<Groups />} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MainLayout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App
