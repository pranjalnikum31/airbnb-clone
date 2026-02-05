import React from 'react'

function Searchbar() {
  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center bg-white shadow-lg rounded-full px-6 py-3 w-[850px]">
        
        <div className="flex-1">
          <p className="text-xs font-semibold">Where</p>
          <input className="outline-none text-sm" placeholder="Search destinations" />
        </div>

        <div className="w-px h-8 bg-gray-200 mx-4" />

        <div className="flex-1">
          <p className="text-xs font-semibold">When</p>
          <p className="text-sm text-gray-400">Add dates</p>
        </div>

        <div className="w-px h-8 bg-gray-200 mx-4" />

        <div className="flex-1">
          <p className="text-xs font-semibold">Who</p>
          <p className="text-sm text-gray-400">Add guests</p>
        </div>

        <button className="ml-4 bg-red-500 text-white rounded-full p-3">
          🔍
        </button>
      </div>
    </div>
  )
}

export default Searchbar
