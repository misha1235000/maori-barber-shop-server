const mongoose = require('mongoose');
const User = require('./user.model');
const Schema = mongoose.Schema;

// create a schema
let AppointmentSchema = new Schema({
    date: { type: Date, required: true, unique: true },
    ownerPhone: {type: String, required: true},
    types: [{ type: String }]
});



let Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;