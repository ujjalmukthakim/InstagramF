import { useEffect, useState } from "react"
import api from "../../api/axios"

const WeeklyBooking = () => {
  const [days, setDays] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    api.get("/booking/availability/")
      .then(res => setDays(res.data))
      .catch(err => setError(err.response?.data?.message))
  }, [])

  const book = (day) => {
    api.post("/booking/book/", { day })
      .then(() => alert("Booked"))
  }

  if (error) return <p>{error}</p>

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
      {days.map(d => (
        <button
          key={d.day}
          disabled={!d.can_book}
          onClick={() => book(d.day)}
          className={`h-20 rounded-lg border ${
            d.can_book ? "hover:bg-blue-50" : "opacity-50"
          }`}
        >
          {d.day}
        </button>
      ))}
    </div>
  )
}

export default WeeklyBooking
