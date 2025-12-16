const express = require("express");
const router = express.Router({mergeParams : true});
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");

/**************************************************************
 *                     🌟 UTILITIES 🌟
 **************************************************************/
// requiring Wrapasync  — isko use krne ke liye  async ke aage lga denge
const wrapAsync = require("../utils/wrapAsync.js");  


const {listingSchema , reviewSchema} = require("../schema.js");

/**************************************************************
 *                     🌟 ERROR HANDLING 🌟
 **************************************************************/
// using Express Error
const ExpressError = require("../utils/ExpressError.js");


const validateListing = (req,res,next) =>{
        let {error} = listingSchema.validate(req.body);
        if(error){
            let errMsg = error.details.map((el) => el.message).join(",");
            throw new ExpressError(400 , errMsg);
        }else{
            next();
        }
}




/**************************************************************
 *                     🌟 LISTINGS ROUTES 🌟
 **************************************************************/

// index route
router.get("/" , async (req , res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});
});

// new route ko show route se upr rkhenge 
// kyuki show route ka id me new ka chla jayega 
// nhi toh us chiz se bchane ke liye kiye hai

// New route  
router.get("/new" ,isLoggedIn, (req, res)=>{
    console.log(req.user);

    res.render("listings/new.ejs");
}); 
// iske baad create route create krenge POST request bhejenge jisme



// show route
router.get("/:id" , wrapAsync (async (req , res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing) {
        req.flash("error" , "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs" , {listing});

}));


// create route
router.post("/" ,validateListing ,isLoggedIn, wrapAsync(async (req , res, next)=>{

        const newListing = new Listing(req.body.listing);
        await newListing.save();
        req.flash("success" , "New Listing Created");
        res.redirect("/listings");
}));



// edit route
router.get("/:id/edit" ,isLoggedIn, wrapAsync (async(req, res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error" , "Listingyou requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs" , {listing});    
}));



// update route
// PUT route to update the listing
// update route (listings.js)
router.put("/:id" ,validateListing,isLoggedIn, wrapAsync (async(req , res)=>{
    let {id} = req.params;
    
    // 1. Get the data from the form
    const listingData = req.body.listing;

    // 2. IMPORTANT: Restructure the image data to match the Schema
    if (listingData.image) {
        // Wrap the incoming string URL into the { url: 'string' } object structure
        listingData.image = { url: listingData.image };
    }

    // 3. Update the listing
    await Listing.findByIdAndUpdate(id, { ...listingData });
    
    // We use listingData instead of req.body.listing to ensure the image is updated 
    // in the correct format.
    
    req.flash("success" , "Listing Updated");
    res.redirect(`/listings/${id}`);
}));



// delete route
router.delete("/:id" ,isLoggedIn ,wrapAsync( async(req ,res)=>{
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing Deleted");
    console.log(deletedListing);
    res.redirect("/listings");
}));



module.exports = router;