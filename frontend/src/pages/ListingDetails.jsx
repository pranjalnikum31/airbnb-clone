import { useParams } from "react-router-dom";
import { listings } from "../data/listings";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ListingDetails() {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === Number(id));

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  if (!listing) return <p>Listing not found</p>;
 const nights =
  checkIn && checkOut
    ? Math.max(
        0,
        Math.round(
          (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
        )
      )
    : 0;
  const totalPrice=nights*listing.price;   
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleReserve = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    else {alert("Reservation successful!"); // Placeholder for actual reservation logic
    }
  }
   
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
            />
          ))}
        </div>

         {/* Content */}
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
              ₹{listing.price}{" "}
              <span className="text-sm font-normal">night</span>
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

            <button onClick={handleReserve} className="mt-4 w-full bg-red-500 text-white py-3 rounded-lg font-semibold">
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
      </div>
    </>
  );
}
