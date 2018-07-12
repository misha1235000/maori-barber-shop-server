const express = require("express");
const router = express.Router();
const AppointmentManager = require("../managers/appointment.manager");

let appointmentManager = new AppointmentManager.AppointmentManager();

router.get('/appointment', (req, res) => { // Gets all the appointments
    appointmentManager.get().then((data) => {
        res.json(data);
    });
});

router.get('/appointment/date/:date', (req, res) => { // Gets appointments by date.
    appointmentManager.getByDate(req.params.date).then((data) => {
        res.json(data);
    });
});

router.get('/appointment/month/:month', (req, res) => { // Gets appointments by month.
    appointmentManager.getByMonth(req.params.month).then((data) => {
        res.json(data);
    });
});

router.post('/appointment', (req, res) => { // Creates a new appointment.
    console.log(req.body.appointment);
    appointmentManager.add(req.body.appointment).then((data) => {
        res.json(data);
    });
});

router.delete('/appointment', (req, res) => { // Deletes an appointment by id
    appointmentManager.delete(req.body._id).then((data) => {
        res.json(data);
    });
});

module.exports = router;