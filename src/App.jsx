import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"

import MainLayout from "./components/layout/MainLayout"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import WeeklyBooking from "./components/booking/WeeklyBooking"
import ActivityTracker from "./components/activity/ActivityTracker"
import ApprovalList from "./components/approval/ApprovalList"
import MainGroupView from "./components/group/MainGroupView"
import SubGroupView from "./components/group/SubGroupView"

// Wrapper component to get subgroupId from URL param
const SubGroupWrapper = () => {
  const { id } = useParams()
  return <SubGroupView subgroupId={id} />
}

function App() {
  const { user, loading } = useContext(AuthContext)

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <BrowserRouter>
      {user ? (
        <MainLayout>
          <Routes>
            {/* Dashboard always available */}
            <Route path="/" element={<Dashboard />} />

            {/* Weekly booking for members who can book */}
            {user.permissions?.can_book && (
              <Route path="/booking" element={<WeeklyBooking />} />
            )}

            {/* Activity tracking for CODE and DELTA */}
            {["DELTA", "CODE"].includes(user.role) && (
              <Route path="/activity" element={<ActivityTracker />} />
            )}

            {/* Approvals for CEO, DIRECTOR, DELTA, CODE */}
            {["CEO", "DIRECTOR", "DELTA", "CODE"].includes(user.role) && (
              <Route path="/approvals" element={<ApprovalList />} />
            )}

            {/* Main group view for CEO, DIRECTOR, DELTA */}
            {["CEO", "DIRECTOR", "DELTA"].includes(user.role) && (
              <Route path="/main-group" element={<MainGroupView />} />
            )}

            {/* Subgroup view for CODE and DELTA */}
            {["CODE", "DELTA"].includes(user.role) && (
              <Route path="/subgroup/:id" element={<SubGroupWrapper />} />
            )}

            {/* Catch all redirects */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MainLayout>
      ) : (
        <Routes>
          {/* Login page for unauthenticated users */}
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App
