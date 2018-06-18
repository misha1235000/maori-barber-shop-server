const express = require("express");
const router = express.Router();
const VerificationManager = require("../managers/verification.manager");
const UserManager = require("../managers/user.manager");
const AppointmentManager = require("../managers/appointment.manager");

let userManager = new UserManager.UserManager();
let verificationManager = new VerificationManager.VerificationManager();
let appointmentManager = new AppointmentManager.AppointmentManager();

router.post('/sms', (req, res) => {
    let phone = '972' + req.body.phone.substr(1);

    userManager.sendSMS(phone).then((data) => {
        res.json(data);
    });
});

router.post('/verify', (req, res) => {
    VerificationManager.verifyCode(req.body.code, req.body.request_id).then((verified) => {
        if (verified.error_text) {
            res.json(verified)
        } else {
            userManager.add(verified.user).then((user) => {
                appointmentManager.add(verified.appointment);
            });
        }
        //res.json(data);
    });
});