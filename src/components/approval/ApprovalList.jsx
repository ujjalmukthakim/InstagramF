import { useEffect, useState } from "react"
import api from "../../api/axios"

const ApprovalList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get("/approvals/pending/")
      .then(res => setUsers(res.data))
  }, [])

  const approve = (id) => {
    api.post("/approvals/decision/", { user_id: id })
      .then(() => setUsers(prev => prev.filter(u => u.id !== id)))
  }

  return (
    <div className="space-y-3">
      {users.map(u => (
        <div key={u.id} className="flex justify-between border p-3 rounded">
          <span>@{u.username}</span>
          <button onClick={() => approve(u.id)}>Approve</button>
        </div>
      ))}
    </div>
  )
}

export default ApprovalList
