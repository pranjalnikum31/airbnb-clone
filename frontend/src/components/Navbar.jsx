import React from "react";
import { HiOutlineMenu } from "react-icons/hi";
import FeatherIcon from "feather-icons-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="flex flex-wrap items-center justify-between px-4 md:px-10 py-4 border-b">

      <div
        className="text-red-500 text-xl md:text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        airbnb
      </div>

      <div className="flex flex-wrap gap-4 md:gap-8 text-sm font-medium mt-3 md:mt-0">

        <span
          className="cursor-pointer border-b-2 border-black pb-2"
          onClick={() => navigate("/")}
        >
          Homes
        </span>

        {user?.role === "host" && (
          <span
            className="cursor-pointer text-gray-700"
            onClick={() => navigate("/add-listing")}
          >
            Add Listing
          </span>
        )}

        {user?.role === "host" && (
          <span
            className="cursor-pointer text-gray-700"
            onClick={() => navigate("/host-dashboard")}
          >
            Host Dashboard
          </span>
        )}

        {isAuthenticated && (
          <span
            className="cursor-pointer text-gray-700"
            onClick={() => navigate("/my-bookings")}
          >
            My Bookings
          </span>
        )}

      </div>

      <div className="flex items-center gap-3 md:gap-4 mt-3 md:mt-0">

        {!isAuthenticated ? (
          <button
            onClick={() => navigate("/login")}
            className="px-3 md:px-4 py-2 text-sm border rounded-lg"
          >
            Login
          </button>
        ) : (
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-sm font-medium hidden sm:block">
              Hello, {user.name}
            </span>

            <button
              onClick={logout}
              className="px-3 py-1 text-sm border rounded-lg"
            >
              Logout
            </button>
          </div>
        )}

        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-[#f2f2f2]">
          <FeatherIcon icon="globe" size={16} />
        </div>

      </div>

    </nav>
  );
}

export default Navbar;