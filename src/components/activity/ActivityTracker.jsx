import { useEffect, useState } from "react"
import api from "../../api/axios"

const ActivityTracker = () => {
  const [members, setMembers] = useState([])

  useEffect(() => {
    api.get("/activity/subgroup/")
      .then(res => setMembers(res.data))
  }, [])

  const mark = (id, status) => {
    api.post("/activity/mark/", { user_id: id, status })
  }

  return (
    <div className="space-y-3">
      {members.map(m => (
        <div key={m.id} className="flex justify-between border p-3 rounded">
          <span>@{m.username}</span>
          <div className="space-x-2">
            <button onClick={() => mark(m.id, true)}>Active</button>
            <button onClick={() => mark(m.id, false)}>Inactive</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ActivityTracker
