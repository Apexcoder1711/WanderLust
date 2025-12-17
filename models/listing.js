const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const defaultImageUrl = "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
   url: {
    type: String,
    default: defaultImageUrl,
    set: (v) => (v === "" ? defaultImageUrl : v),
  },
   filename: {
    type: String,
   },
  },
  price: {
        type: Number,
        required: true, // Add this line!
        min: 0          // Good to add a minimum value
    },
  location: String,
  country: String,

  reviews : [
    {
      type : Schema.Types.ObjectId,
      ref : "Review",
    }
  ],

  owner : {
    type : Schema.Types.ObjectId,
    ref : "User"
  }
});


//post middleware for deleting reviews when listing deleted
listingSchema.post("findOneAndDelete" , async(listing)=>{
  if(listing){
    await Review.deleteMany({_id : {$in: listing.reviews}});
  }
  
})


const Listing = mongoose.model("Listing" , listingSchema);

module.exports = Listing;