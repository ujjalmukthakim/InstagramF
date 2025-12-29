import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import Dashboard from "./pages/Dashboard"
import WeeklyBooking from "./components/booking/WeeklyBooking"
import ActivityTracker from "./components/activity/ActivityTracker"
import ApprovalList from "./components/approval/ApprovalList"

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/booking" element={<WeeklyBooking />} />
          <Route path="/activity" element={<ActivityTracker />} />
          <Route path="/approvals" element={<ApprovalList />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
