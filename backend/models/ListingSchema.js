import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      default: 4.5
    },
    images: [
      {
        type: String
      }
    ],
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },{timestamps:true})

  const Listing = mongoose.model("Listing", listingSchema);
  export default Listing