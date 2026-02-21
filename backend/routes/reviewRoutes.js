import express from "express";
import Review from "../models/ReviewSchema.js";
import Booking from "../models/BookingSchema.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { listingId, rating, comment } = req.body;

    // Check if user has booked this listing
    const hasBooked = await Booking.findOne({
      listing: listingId,
      user: req.user._id
    });

    if (!hasBooked) {
      return res.status(403).json({
        message: "You can only review listings you have booked"
      });
    }

    // Prevent duplicate reviews
    const existingReview = await Review.findOne({
      listing: listingId,
      user: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this listing"
      });
    }

    const review = new Review({
      user: req.user._id,
      listing: listingId,
      rating,
      comment
    });

    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:listingId", async (req, res) => {
  try {
    const reviews = await Review.find({
      listing: req.params.listingId
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;