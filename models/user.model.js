const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
let userSchema = new Schema({
    phone: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isApproved: { type: Boolean }
});

let User = mongoose.model('User', userSchema);

module.exports = User;