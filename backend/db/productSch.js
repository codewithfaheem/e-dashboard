const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    company: String,
    price: Number,
    description: String,
    rating: Number,
    image: String,
})

module.exports = mongoose.model("products", productSchema)