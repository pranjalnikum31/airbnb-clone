import { useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

export default function AddListing() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreview(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("price", price);

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await axios.post("/listings", formData);
      alert("Listing created successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to create listing");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-2xl font-semibold mb-6">Add New Listing</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Title"
            className="border p-3 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Location"
            className="border p-3 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-3 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="file"
            multiple
            onChange={handleImageChange}
          />

          {/* Image Preview */}
          <div className="grid grid-cols-3 gap-3">
            {preview.map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-24 w-full object-cover rounded"
              />
            ))}
          </div>

          <button
            type="submit"
            className="bg-red-500 text-white py-3 rounded font-semibold"
          >
            Create Listing
          </button>

        </form>
      </div>
    </>
  );
}