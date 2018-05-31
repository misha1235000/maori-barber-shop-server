const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
let userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: Boolean,
    firstName: String,
    lastName: String,
    age: Number,
    isApproved: Boolean
});



let User = mongoose.model('User', userSchema);

module.exports = User;