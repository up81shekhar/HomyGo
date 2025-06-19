const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    
    image: {
        type: String,
        default : "https://cdn.pixabay.com/photo/2024/01/25/12/30/mountain-8531778_1280.jpg",
        set: (v) => v === "" ? "https://cdn.pixabay.com/photo/2024/01/25/12/30/mountain-8531778_1280.jpg" : v,
    },

    // image:{
    //     type: String,
    //     default: "https://cdn.pixabay.com/photo/2024/01/25/12/30/mountain-8531778_1280.jpg",
    // },

    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
