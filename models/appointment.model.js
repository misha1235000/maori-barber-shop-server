const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
let AppointmentSchema = new Schema({
    date: { type: Date, required: true, unique: true },
    ownerID: {type: String, required: true},
    duration: {type: Number, required: true},
    totalprice: {type: Number, required: true}
});



let Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;