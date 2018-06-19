const mongoose = require('mongoose');
const User = require('./user.model');
const Schema = mongoose.Schema;

// create a schema
let AppointmentSchema = new Schema({
    datefrom: { type: Number, required: true, unique: true },
    ownerPhone: {type: String, required: true},
    types: [{ type: String, required: true }]
});



let Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;