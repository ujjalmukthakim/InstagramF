const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  )
}

export default StatCard
