import React from "react";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import ListingCard from "../components/ListingCard";
import { listings } from "../data/listings";
import Section from "../components/Section";
function Home() {
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
          id: item.id,
          component: <ListingCard {...item} />,
        }))}
      />
    </>
  );
}

export default Home;
