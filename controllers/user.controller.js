const express = require("express");
const router = express.Router();
const UserManager = require("../managers/user.manager");
const AppointmentManager = require("../managers/appointment.manager");

let userManager = new UserManager.UserManager();

router.get('/user', (req, res) => {
    userManager.get().then((data) => {
        res.json(data);
    });
});

router.post('/user', (req, res) => {
    userManager.add(req.body.user).then((data) => {
        res.json(data);
    });
});

router.delete('/user', (req, res) => {
    userManager.delete(req.body._id).then((data) => {
        res.json(data);
    });
});

module.exports = router;