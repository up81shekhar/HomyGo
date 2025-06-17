const express = require("express");
const app = express();
const mongoose = require("mongoose");

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
