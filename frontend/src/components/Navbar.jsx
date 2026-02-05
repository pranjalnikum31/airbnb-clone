import React from 'react'
import { HiOutlineMenu } from "react-icons/hi"
import FeatherIcon from "feather-icons-react"



function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-4 border-b">
      <div className="text-red-500 text-2xl font-bold">airbnb</div>

      <div className="flex gap-8 text-sm font-medium">
        <span className="border-b-2 border-black pb-2">Homes</span>
        <span className="text-gray-500">Experiences</span>
        <span className="text-gray-500">Services</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm">Become a host</span>
        <div className="w-9 h-9 rounded-full border border-none flex items-center justify-center bg-[#f2f2f2]">
          <FeatherIcon icon="globe" size={16} />
        </div>
        <div className="w-9 h-9 rounded-full border border-none flex items-center justify-center bg-[#f2f2f2]">
          <HiOutlineMenu size={16} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
