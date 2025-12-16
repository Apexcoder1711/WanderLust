/**************************************************************
 *                     🌟 BASIC SETUP 🌟
 **************************************************************/
const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");



app.get("/" , (req,res)=>{
    res.send("Hi , I am home");
})



//using flash 
const flash = require("connect-flash");

//requiring express-session
const session = require("express-session");
const sessionOptions = {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24* 60 * 60 * 1000 ,
        maxAge : 7 * 24* 60 * 60 * 1000,
        httpOnly : true
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //It shows ki Local Strategy use hua hai jisme authenticate function call hua hai
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//creating middleWare for flash
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next(); 
})

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userRouter = require("./routes/user.js");





/**************************************************************
 *                     🌟 DATABASE SETUP 🌟
 **************************************************************/
const mongoose = require('mongoose');

// getting-started.js
main()
    .then(()=>{
        console.log("connected to db");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` 
  // if your database has auth enabled
}



// app.get("/testListing" , async (req ,res)=>{
//     let sampleListing = new Listing({
//         title : "my new Villa",
//         description : "By the beach" , 
//         price : 1200,
//         location : "Goa" ,
//         country : "India"
//     });

//     await sampleListing.save();

//     console.log("sample was saved");
//     res.send("Successful testing");
// })


/**************************************************************
 *                     🌟 UTILITIES 🌟
 **************************************************************/
// requiring Wrapasync  — isko use krne ke liye  async ke aage lga denge
const wrapAsync = require("./utils/wrapAsync.js");

/**************************************************************
 *                     🌟 ERROR HANDLING 🌟
 **************************************************************/
// using Express Error
const ExpressError = require("./utils/ExpressError.js");


/**************************************************************
 *                🌟 VIEW ENGINE (EJS) SETUP 🌟
 **************************************************************/
const path = require("path");
const ejsMate = require("ejs-mate");
app.engine('ejs', ejsMate); // ejs-mate setup

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

app.use(express.static(path.join(__dirname , "/public")));




/**************************************************************
 *                     🌟 MIDDLEWARE 🌟
 **************************************************************/
app.use(express.urlencoded({extended: true})); // for data parsing

const methodOverride = require("method-override");
app.use(methodOverride("_method")); // to override method in forms




app.use("/listings" , listings);
app.use("/listings/:id/reviews" , reviews);
app.use("/" , userRouter);


app.use((err,req,res,next)=>{
    res.send("Something went wrong");
});


// app.all("/:path" , (req , res ,next)=>{
//     next(new ExpressError(404 , "Page not found"));
// });

app.use((err,req,res,next)=>{
    let {statusCode= 404 , message = "Something went wrong"} = err;
    res.status(statusCode).render("error.ejs" , {message});
});





/**************************************************************
 *                     🌟 SERVER START 🌟
 **************************************************************/
app.listen( 8080 , ()=>{
    console.log("server is listenin on port 8080");
});
