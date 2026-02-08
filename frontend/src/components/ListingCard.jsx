import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListingCard({ id, images, location, title, price, rating }) {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  
  const next = (e) => {
    e.stopPropagation();
    setCurrent((current + 1) % images.length);
  };

  const prev = (e) => {
    e.stopPropagation();
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <div onClick={() => navigate(`/listing/${id}`)} className="cursor-pointer">
      <div className="relative">
        <img
          src={images[current]}
          className="h-[260px] w-full object-cover rounded-xl"
        />

        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full"
        >
          ‹
        </button>

        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full"
        >
          ›
        </button>

        <button className="absolute top-3 right-3 text-white text-xl">♡</button>
      </div>

      <div className="mt-3 flex justify-between">
        <h3 className="font-semibold text-sm">{location}</h3>
        <span className="text-sm">⭐ {rating}</span>
      </div>

      <p className="text-gray-500 text-sm">{title}</p>

      <p className="mt-1 text-sm">
        <span className="font-semibold">₹{price}</span> night
      </p>
    </div>
  );
}
