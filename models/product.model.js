const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
let ProductSchema = new Schema({
    image: { type: String, required: true },
    date: { type: Date, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true }
});

let Product = mongoose.model('Product', ProductSchema);

module.exports = Product;