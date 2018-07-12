const express = require("express");
const router = express.Router();
const AppointmentTypeManager = require("../managers/appointment-type.manager");

let appointmentTypeManager = new AppointmentTypeManager.AppointmentTypeManager();

router.get('/type', (req, res) => { // Gets all the appointment types.
    appointmentTypeManager.get().then((data) => {
        res.json(data);
    });
});

router.post('/type', (req, res) => { // Creates a new appointment type.
    appointmentTypeManager.add(req.body.type).then((data) => {
        res.json(data);
    });
});

router.delete('/type', (req, res) => { // Deletes an appointment type by id.
    appointmentTypeManager.delete(req.body._id).then((data) => {
        res.json(data);
    });
});

module.exports = router;