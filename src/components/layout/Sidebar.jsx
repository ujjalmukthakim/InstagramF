import { NavLink } from "react-router-dom"
import { useContext } from "react"
// import { AuthContext } from "../../context/AuthContext"
import {AuthContext} from "../../context/AuthContext"

const Sidebar = () => {
  const { user } = useContext(AuthContext)
  if (!user) return null

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:block w-64 bg-white border-r">
        <nav className="p-4 space-y-2">

          <NavLink to="/">Dashboard</NavLink>

          {["CEO", "DIRECTOR", "DELTA"].includes(user.role) && (
            <NavLink to="/groups">Groups</NavLink>
          )}

          <NavLink to="/booking">Booking</NavLink>

          {["DELTA", "CODE"].includes(user.role) && (
            <NavLink to="/activity">Activity</NavLink>
          )}

          {user.role !== "MEMBER" && (
            <NavLink to="/approvals">Approvals</NavLink>
          )}

        </nav>
      </aside>
    </>
  )
}

export default Sidebar
