const express = require("express");
const router = express.Router();
const AppointmentManager = require("../managers/appointment.manager");

let appointmentManager = new AppointmentManager.AppointmentManager();

router.get('/appointment', (req, res) => {
    appointmentManager.get().then((data) => {
        res.json(data);
    });
});

router.get('/appointment/:date', (req, res) => {
    appointmentManager.getByDate(req.params.date).then((data) => {
        res.json(data);
    });
});

router.post('/appointment', (req, res) => {
    console.log(req.body.appointment);
    appointmentManager.add(req.body.appointment).then((data) => {
        res.json(data);
    });
});

router.delete('/appointment', (req, res) => {
    appointmentManager.delete(req.body._id).then((data) => {
        res.json(data);
    });
});

module.exports = router;