const express = require("express");
const router = express.Router();
const AppointmentManager = require("../managers/appointment.manager");

let appointmentManager = new AppointmentManager.AppointmentManager();

router.get('/appointment', (req, res) => {
    appointmentManager.get().then((data) => {
        res.json(data);
    });
});

router.post('/appointment', (req, res) => {
    appointmentManager.add(req.body.appointment).then((data) => {
        res.json(data);
    });
});

router.delete('/appointment', (req, res) => {
    appointmentManager.delete(req.body._id).then((data) => {
        res.json(data);
    });
});

/*
router.delete('/apointment', (req, res) => {
    userManager.deleteAllUsers().then((data) => {
        res.json(data);
    });
});
*/

module.exports = router;