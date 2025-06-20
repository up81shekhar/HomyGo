const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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

app.listen(8080,()=>{
    console.log("App is listening on port 8080");
});

app.get("/",(req,res)=>{
    res.send("Root is working bhaiya ji");
});

//INDEX EJS ROUTE 
app.get("/listing", async ( req , res ) => {
    const allistings = await Listing.find({});
    res.render("listings/index.ejs", {allistings});
});

//New ejs ROute
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//SHOW EJS ROUTE
app.get("/listing/:id", async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//Create ROUTE
app.post("/listing",async (req,res) => {
    // let {title, description, image, price, location, country} = req.body;
    let newListing = new Listing(req.body.listing);
    console.log(newListing);
    // const newListing = new Listing( {
    //     title : title,
    //     description : description,
    //     image : image,
    //     price : price,
    //     location : location,
    //     country : country,
    // });
    await newListing.save();
    res.redirect("/listing");
});

//Edit listing Route
app.get("/listing/:id/edit",async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

//UPDATE ROUTE
app.put("/listing/:id", async (req,res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing})
    res.redirect(`/listing/${id}`);
});

//delete route
app.delete("/listing/:id", async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listing");
});
