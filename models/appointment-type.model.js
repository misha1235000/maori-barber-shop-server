const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
let AppointmentTypeSchema = new Schema({
    title: { type: String, required: true, unique: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    desc: { type: String, required: true }
});



let AppointmentType = mongoose.model('AppointmentType', AppointmentTypeSchema);

module.exports = AppointmentType;