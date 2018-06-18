const express = require("express");
const router = express.Router();
const VerificationManager = require("../managers/verification.manager");
const UserManager = require("../managers/user.manager");
const AppointmentManager = require("../managers/appointment.manager");

let userManager = new UserManager.UserManager();
let verificationManager = new VerificationManager.VerificationManager();
let appointmentManager = new AppointmentManager.AppointmentManager();

router.post('/sms', (req, res) => {
    let regex = /^05\d{8}$/;
    let phone;

    if (!regex.test(req.body.phone)) {
        res.json({'error_text': 'wrong number'})
    } else {
        phone = '972' + req.body.phone.substr(1);
        verificationManager.sendSMS(phone).then((data) => {
            res.json(data);
        });
    }
});

router.post('/verify', (req, res) => {
    verificationManager.verifyCode(req.body.code, req.body.request_id).then((verified) => {
        if (verified.error_text) {
            res.json(verified)
        } else {
            req.body.user.isApproved = false;
            userManager.add(req.body.user).then((user) => {
                appointmentManager.add(req.body.appointment).then((appointment) => {
                    res.json({'success': 'success'});
                });
            });
        }
        //res.json(data);
    });
});

module.exports = router;