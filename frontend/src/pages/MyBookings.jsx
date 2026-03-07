import React from "react";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("/bookings/my");
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return <p className="text-center mt-16">Loading bookings...</p>;
  }

  const handleCancel = async (id) => {
    try {
      await axios.delete(`/bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (error) {
      alert("Failed to cancel booking");
    }
  };

  return (
    <>
      <Navbar />

      <div className="px-4 md:px-10 py-8 max-w-6xl mx-auto">
        <h1 className="text-xl md:text-2xl font-semibold mb-6">My Bookings</h1>

        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="border rounded-xl p-4 md:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 shadow"
              >
                <img
                  src={booking.listing?.images?.[0]}
                  alt=""
                  className="w-full sm:w-40 h-40 sm:h-28 object-cover rounded-lg"
                />

                <div>
                  <h2 className="font-semibold text-base md:text-lg">
                    {booking.listing?.title || "listing removed"}
                  </h2>

                  <p className="text-gray-600">
                    {new Date(booking.checkIn).toLocaleDateString()} →{" "}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </p>

                  <p className="mt-2 font-semibold">₹{booking.totalPrice}</p>

                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="mt-2 text-red-500 text-sm cursor-pointer"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyBookings;