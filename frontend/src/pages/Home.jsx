import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import ListingCard from "../components/ListingCard";
import Section from "../components/Section";
import axios from "../api/axios";

function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(`/listings?location=${search}`);
        setListings(res.data);
      } catch (error) {
        console.error("Error fetching listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [search]);

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-16 text-sm md:text-base">
          Loading listings...
        </p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="px-4 md:px-10 max-w-[1400px] mx-auto">
        <Searchbar setSearch={setSearch} />

        <Section
          title="Popular homes"
          items={listings.map((item) => ({
            id: item._id,
            component: <ListingCard id={item._id} {...item} />,
          }))}
        />
      </div>
    </>
  );
}

export default Home;