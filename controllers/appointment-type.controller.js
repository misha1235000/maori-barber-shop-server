const express = require("express");
const router = express.Router();
const AppointmentTypeManager = require("../managers/appointment-type.manager");

let appointmentTypeManager = new AppointmentTypeManager.AppointmentTypeManager();

router.get('/type', (req, res) => {
    appointmentTypeManager.get().then((data) => {
        res.json(data);
    });
});

router.post('/type', (req, res) => {
    appointmentTypeManager.add(req.body.type).then((data) => {
        res.json(data);
    });
});

router.delete('/type', (req, res) => {
    appointmentTypeManager.delete(req.body._id).then((data) => {
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