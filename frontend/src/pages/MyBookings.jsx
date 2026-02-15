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
    return <p className="text-center mt-10">Loading bookings...</p>;
  }
  return (
    <>
      <Navbar />
      <div className="px-10 py-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>

        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="border rounded-xl p-6 flex gap-6 shadow"
              >
                <img
                  src={booking.listing.images[0]}
                  alt=""
                  className="w-40 h-28 object-cover rounded-lg"
                />

                <div>
                  <h2 className="font-semibold text-lg">
                    {booking.listing.title}
                  </h2>

                  <p className="text-gray-600">
                    {new Date(booking.checkIn).toLocaleDateString()} →{" "}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </p>

                  <p className="mt-2 font-semibold">
                    ₹{booking.totalPrice}
                  </p>
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
