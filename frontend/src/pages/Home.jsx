import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import ListingCard from "../components/ListingCard";
import Section from "../components/Section";
import axios from "../api/Axios";
function Home() {
  const [listings,setListings]=useState([])
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    const fetchListings=async()=>{
      try {
        const res =await axios.get("/listings");
        setListings(res.data);
      } catch (error) {
        console.error("Error fetching listings");
      }
      finally{
        setLoading(false);
      }
    };
    fetchListings();
  },[])
  if (loading) {
    return <p className="text-center mt-10">Loading listings...</p>;
  }
  return (
    <>
      <Navbar />
      <Searchbar />
      {/* <div className="px-10 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((item) => (
          <ListingCard key={item.id} {...item} />
        ))}
      </div> */}
      <Section
        title="Popular homes"
        items={listings.map((item) => ({
          id: item._id,
          component: <ListingCard id={item._id} {...item} />,
        }))}
      />
      
    </>
  );
}

export default Home;
