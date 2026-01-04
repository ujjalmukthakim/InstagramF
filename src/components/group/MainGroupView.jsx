import { useEffect, useState, useContext } from "react"
import api from "../api/axios"
import { AuthContext } from "../context/AuthContext"

const MainGroupView = () => {
  const auth = useContext(AuthContext)   // get the full context
  const user = auth?.user                // optional chaining avoids undefined errors
  const [mainGroups, setMainGroups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchMainGroups = async () => {
      try {
        const res = await api.get("/groups/main/")
        setMainGroups(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMainGroups()
  }, [user])

  if (loading) return <p className="text-center mt-4">Loading Main Groups...</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Main Groups</h1>
      {mainGroups.length === 0 ? (
        <p>No Main Groups available</p>
      ) : (
        mainGroups.map((group) => (
          <div key={group.id} className="bg-white shadow rounded p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">{group.name}</h2>
            <p>Main Admin: {group.main_admin?.username}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              {group.subgroups.map((sub) => (
                <div key={sub.id} className="border p-2 rounded">
                  <h3 className="font-semibold">{sub.name}</h3>
                  <p>Admin: {sub.admin?.username}</p>
                  <p>Members: {sub.members.length}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default MainGroupView
