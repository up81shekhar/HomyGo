const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const WrapAsync = require("./utils/WrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const ejsMate = require("ejs-mate");
const { threadId } = require("worker_threads");
const { listingSchema } = require("./schema.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const Mongo_Link = "mongodb://127.0.0.1:27017/homyGo";

async function main() {
    await mongoose.connect(Mongo_Link);
}

main()
    .then(()=>{
    console.log("Connected to Database");
    })
    .catch((err) => {
    console.log(err);
    });



app.get("/",(req,res)=>{
    res.send("Root is working bhaiya ji");
});

const validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, error);
    }else{
        next();
    }
}

//INDEX EJS ROUTE 
app.get("/listing", WrapAsync( async ( req , res ) => {
    const allistings = await Listing.find({});
    res.render("listings/index.ejs", {allistings});
}));

//New ejs ROute
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
});

//SHOW EJS ROUTE
app.get("/listing/:id", WrapAsync( async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));

//Create ROUTE
app.post("/listing", validateListing, WrapAsync( async (req,res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
}));

//Edit listing Route
app.get("/listing/:id/edit",WrapAsync( async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}));

//UPDATE ROUTE
app.put("/listing/:id", validateListing, WrapAsync( async (req,res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing})
    res.redirect(`/listing/${id}`);
}));

//delete route
app.delete("/listing/:id",WrapAsync( async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listing");
}));

app.all(/.*/, (req, res, next) => {
           next(new ExpressError(404, "Page Not Found!"));
      });

app.use((err,req,res,next)=>{
  let {statusCode=500,message="something went wrong!"}=err;
//   res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs", {message});
})


app.listen(8080,()=>{
    console.log("App is listening on port 8080");
});
