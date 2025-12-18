const express = require("express");
const router = express.Router({mergeParams : true});
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner} = require("../middleware.js");
const multer  = require('multer');
const {storage } = require("../cloudConfig.js");
const upload = multer({ storage});


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


const listingController = require("../controllers/listing.js")

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
router.get("/" , wrapAsync(listingController.index));

// new route ko show route se upr rkhenge 
// kyuki show route ka id me new ka chla jayega 
// nhi toh us chiz se bchane ke liye kiye hai

// New route  
router.get("/new" ,isLoggedIn, listingController.renderNewForm); 
// iske baad create route create krenge POST request bhejenge jisme

// create route
router.post("/" ,isLoggedIn, upload.single("listing[image]"),validateListing , wrapAsync(listingController.createListing));

// router.post("/" , , (req,res)=>{
//     res.send(req.file);
// })


// show route
router.get("/:id" , wrapAsync (listingController.showListing));




// edit route
router.get("/:id/edit" ,isLoggedIn, isOwner, wrapAsync (listingController.editListing));


// update route
// PUT route to update the listing
// update route (listings.js)
router.put("/:id" ,isLoggedIn,upload.single("listing[image]") , validateListing, isOwner ,wrapAsync (listingController.updateListing));



// delete route
router.delete("/:id" ,isLoggedIn,isOwner ,wrapAsync( listingController.deleteListing));



module.exports = router;