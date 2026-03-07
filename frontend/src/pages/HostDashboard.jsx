import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function HostDashboard() {
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/listings/${id}`);

      setListings((prev) => prev.filter((listing) => listing._id !== id));
    } catch (error) {
      console.error("Error deleting listing");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingsRes = await axios.get("/listings/my");
        const bookingsRes = await axios.get("/bookings/host");
        // console.log("Listings:", listingsRes.data);

        setListings(listingsRes.data);
        setBookings(bookingsRes.data);
      } catch (error) {
        console.error("Error loading host dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  const totalRevenue = bookings.reduce(
    (acc, booking) => acc + booking.totalPrice,
    0,
  );

  return (
    <>
      <Navbar />
      <div className="px-10 py-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Host Dashboard</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Total Revenue: ₹{totalRevenue}
          </h2>
          <p>Total Bookings: {bookings.length}</p>
        </div>

        <h2 className="text-xl font-semibold mb-4">My Listings</h2>

        {listings.length === 0 ? (
          <p>No listings yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing._id} className="border p-4 rounded-lg shadow">
                <img
                  src={listing.images[0]}
                  alt=""
                  className="h-40 w-full object-cover rounded"
                />
                <h3 className="mt-2 font-semibold">{listing.title}</h3>
                <p className="text-gray-600">₹{listing.price} / night</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => navigate(`/edit-listing/${listing._id}`)}
                    className="bg-blue-500 cursor-pointer text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="bg-red-500 text-white cursor-pointer px-3 py-1 rounded"
                  >
                    Delete
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
