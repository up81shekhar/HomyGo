const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));

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

//NEW LISTING ROUTE
app.post("/listing",async (req,res) => {
    let {title, description, image, price, location, country} = req.body;
    const newListing = new Listing( {
        title : title,
        description : description,
        image : image,
        price : price,
        location : location,
        country : country,
    });
    await newListing.save();
    console.log("saved successfully");
    res.redirect("/listing");
});
