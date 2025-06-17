const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const Mongo_Link = "mongodb://127.0.0.1:27017/homyGo";

async function main() {
    await mongoose.connect(Mongo_Link);
}
main()
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((err) => {
        console.log(err);
    });

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data Was Initialized");
};

initDB();
