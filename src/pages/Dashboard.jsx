import { useEffect, useState } from "react"
import api from "../api/axios"

const Dashboard = () => {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get("/dashboard/stats/")
      .then(res => setStats(res.data))
  }, [])

  if (!stats) return <p>Loading...</p>

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat label="Members" value={stats.members} />
      <Stat label="Active %" value={`${stats.activity}%`} />
      <Stat label="Bookings" value={stats.bookings} />
      <Stat label="Pending" value={stats.pending} />
    </div>
  )
}

const Stat = ({ label, value }) => (
  <div className="bg-white p-4 rounded-xl border">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
)

export default Dashboard
