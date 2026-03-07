import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

export default function EditListing() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`/listings/${id}`);

        setTitle(res.data.title);
        setLocation(res.data.location);
        setPrice(res.data.price);

      } catch (error) {
        console.error("Error loading listing");
      }
    };

    fetchListing();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.put(`/listings/${id}`, {
        title,
        location,
        price
      });

      navigate("/host-dashboard");

    } catch (error) {
      console.error("Error updating listing");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto mt-10 px-4 md:px-0">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">
          Edit Listing
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border p-2 rounded w-full"
          />

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="border p-2 rounded w-full"
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="border p-2 rounded w-full"
          />

          <button
            type="submit"
            className="bg-red-500 text-white py-2 rounded w-full"
          >
            Update Listing
          </button>

        </form>
      </div>
    </>
  );
}