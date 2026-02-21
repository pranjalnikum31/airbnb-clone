import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";

export default function ListingDetails() {
  const { id } = useParams();

  // ✅ ALL HOOKS AT TOP
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Fetch listing
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`/listings/${id}`);
        setListing(res.data);
        const reviewsRes = await axios.get(`/reviews/${id}`);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error("Error fetching listing");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  // ✅ Loading state
  if (loading) {
    return <p className="text-center mt-10">Loading listing...</p>;
  }
  console.log("ID from URL:", id);

  // ✅ Not found state
  if (!listing) {
    return <p className="text-center mt-10">Listing not found</p>;
  }

  // ✅ Nights calculation
  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.round(
            (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24),
          ),
        )
      : 0;

  const totalPrice = nights * listing.price;

  const handleReserve = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }
    try {
      await axios.post("/bookings", {
        listingId: listing._id,
        checkIn,
        checkOut,
        guests,
      });
      alert("Booking successful!");
      navigate("/my-bookings");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };
  const handleReviewSubmit = async () => {
    try {
      await axios.post("/reviews", {
        listingId: id,
        rating,
        comment,
      });

      alert("Review added!");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <>
      <Navbar />

      <div className="px-10 py-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold">{listing.title}</h1>
        <p className="text-gray-600">{listing.location}</p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {listing.images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="h-[250px] w-full object-cover rounded-xl"
              alt=""
            />
          ))}
        </div>

        <div className="mt-10 flex gap-10">
          {/* Left side */}
          <div className="flex-1">
            <p className="text-lg font-medium mb-2">About this place</p>
            <p className="text-gray-600">
              A beautiful stay located in {listing.location}. Perfect for a
              comfortable and relaxing experience.
            </p>
          </div>

          {/* Right side — Booking Box */}
          <div className="w-[350px] border rounded-xl p-6 shadow-lg h-fit">
            <p className="text-xl font-semibold mb-4">
              ₹{listing.price}
              <span className="text-sm font-normal"> / night</span>
            </p>

            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 border-b">
                <div className="p-3 border-r">
                  <p className="text-xs font-semibold">CHECK-IN</p>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full outline-none text-sm"
                  />
                </div>

                <div className="p-3">
                  <p className="text-xs font-semibold">CHECK-OUT</p>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full outline-none text-sm"
                  />
                </div>
              </div>

              <div className="p-3">
                <p className="text-xs font-semibold">GUESTS</p>
                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleReserve}
              className="mt-4 w-full bg-red-500 text-white py-3 rounded-lg font-semibold"
            >
              Reserve
            </button>

            {nights > 0 && (
              <div className="mt-4 text-sm">
                <div className="flex justify-between">
                  <span>
                    ₹{listing.price} × {nights} nights
                  </span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="flex justify-between font-semibold mt-2">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>

          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="border-b py-4">
                <p className="font-semibold">{review.user.name}</p>
                <p>⭐ {review.rating}</p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))
          )}
        </div>
        {isAuthenticated && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Leave a Review</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-2 rounded mb-2"
            />
            <button
              onClick={handleReviewSubmit}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </>
  );
}
