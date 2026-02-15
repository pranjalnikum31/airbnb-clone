import express from "express";
import Booking from "../models/BookingSchema.js";
import Listing from "../models/ListingSchema.js";
import protect from "../middleware/authMiddleware.js";

const router=express.Router();

router.post("/",protect,async (req,res)=>{
    try {
        const {listingId,checkIn,checkOut,guests}=req.body;
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        const nights = (new Date(checkOut) - new Date(checkIn)) /
        (1000 * 60 * 60 * 24);
        const totalPrice = nights * listing.price;
        
        const booking = new Booking({
            listing: listingId,
            user: req.user._id,
            checkIn,
            checkOut,
            guests,
            totalPrice
        })
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        console.log("Booking error:", error);
        res.status(500).json({ message: error.message });
    }
})
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("listing");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;