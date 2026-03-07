import express from "express";
import Listings from "../models/ListingSchema.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import cloudinary from "../config/cloudinary.js";
import Booking from "../models/BookingSchema.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("host"),
  upload.array("images"),
  async (req, res) => {
    try {
      const imageUrls = [];

      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "airbnb-clone" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );

          stream.end(file.buffer);
        });

        imageUrls.push(result.secure_url);
      }
      const listing = new Listings({
        ...req.body,
        images:imageUrls,
        host: req.user._id,
      });
      await listing.save();
      res.status(201).json(listing);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
);

router.get("/", async (req, res) => {
  try {
    const{location}=req.query
    let query={};
    if(location){
      query.location={$regex:location,$options:"i"}
    }
    const listings = await Listings.find(query).populate("host", "name email");
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/my", protect, authorizeRoles("host"), async (req, res) => {
  try {
    const listings = await Listings.find({ host: req.user._id });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const listing = await Listings.findById(req.params.id).populate(
      "host",
      "name email",
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", protect, authorizeRoles("host"), async (req, res) => {
  try {
    const listing = await Listings.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this listing" });
    }

    await listing.deleteOne();
    await Booking.deleteMany({ listing: req.params.id });

    res.json({ message: "Listing deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", protect, authorizeRoles("host"), async (req, res) => {
  try {
    const listing = await Listings.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedListing = await Listings.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedListing);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
