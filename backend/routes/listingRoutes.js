import express from "express";
import Listings from "../models/ListingSchema.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router =express.Router();

router.post("/",protect,authorizeRoles("host"),async (req,res) => {
    try {
        const listing=new Listings({
            ...req.body,
            host:req.user._id
        });
        await listing.save();
        res.status(201).json(listing)
    } catch (error) {
         res.status(500).json({ message: "Server error" });
    }
})

router.get("/",async (req,res) => {
    try {
        const listings=await Listings.find().populate("host","name email")
        res.json(listings)
    } catch (error) {
            res.status(500).json({ message: "Server error" });
    }
})

router.get("/:id", async (req, res) => {
  try {
    const listing = await Listings.findById(req.params.id).populate("host", "name email");

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
export default router;