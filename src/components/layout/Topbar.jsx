const Topbar = () => {
  return (
    <header className="bg-white border-b px-4 sm:px-6 py-3 flex justify-between items-center">
      <h1 className="text-base sm:text-lg font-semibold text-gray-800">
        Dashboard
      </h1>

      <div className="text-xs sm:text-sm text-gray-600">
        Role: <span className="font-medium">Delta</span>
      </div>
    </header>
  )
}

export default Topbar
