import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import api from "../api/axios"
import { AuthContext } from "../context/AuthContext"

const SubGroupView = () => {
  const { id } = useParams()
  const auth = useContext(AuthContext)
  const user = auth?.user
  const [subgroup, setSubgroup] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchSubgroup = async () => {
      try {
        const res = await api.get(`/groups/subgroup/${id}/`)
        setSubgroup(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubgroup()
  }, [user, id])

  if (loading) return <p className="text-center mt-4">Loading Subgroup...</p>
  if (!subgroup) return <p>Subgroup not found</p>

  const handleDone = async (memberId) => {
    try {
      await api.post(`/activity/done/`, { member_id: memberId })
      setSubgroup((prev) => ({
        ...prev,
        members: prev.members.map((m) =>
          m.id === memberId ? { ...m, done_today: true } : m
        ),
      }))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{subgroup.name}</h1>
      <h2 className="text-lg mb-4">Admin: {subgroup.admin?.username}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subgroup.members.map((member) => (
          <div
            key={member.id}
            className="flex justify-between items-center bg-white p-3 rounded shadow"
          >
            <span>{member.username}</span>
            <button
              disabled={member.done_today}
              onClick={() => handleDone(member.id)}
              className={`px-3 py-1 rounded text-white ${
                member.done_today
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {member.done_today ? "Done" : "Mark Done"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubGroupView
