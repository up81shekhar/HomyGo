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

// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title : "My Home",
//         description : "Mountain view",
//         price : 1200,
//         location : "Himachal",
//         country : "India",
//     });

//     await sampleListing.save().then(()=>{
//         console.log("Listing saved");
//     }).catch((err) => {
//         console.log(err);
//     });

//     res.send("Saved successful");
// });
