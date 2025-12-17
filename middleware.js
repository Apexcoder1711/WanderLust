const Listing = require("./models/listing");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // 1. Capture the URL the user was trying to visit
        req.session.redirectUrl = req.originalUrl;

        // 2. THE FIX: Check if the user was trying to perform a Review action (like Delete)
        // If yes, redirect them to the Listing page instead of the specific Review URL.
        if (req.originalUrl.includes("/reviews")) {
            // "split" cuts the URL at "/reviews" and takes the first part (/listings/:id)
            req.session.redirectUrl = req.originalUrl.split("/reviews")[0];
        }

        req.flash("error", "You must be logged in to do that!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req , res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner = async(req , res ,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error" , "you are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
}


module.exports.isReviewAuthor = async(req , res ,next)=>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error" , "you are not the author of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
}

