export default function ListingCard({ image, location, title, price, rating }) {
  return (
    <div className="cursor-pointer">
      <div className="relative">
        <img
          src={image}
          className="h-[260px] w-full object-cover rounded-xl"
        />
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
  )
}
