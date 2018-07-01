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

    if (!regex.test(req.body.user.phone)) {
        res.json({'error_text': 'מספר שגוי'})
    } else {
        phone = '972' + req.body.user.phone.substr(1);
        userManager.getByPhone(req.body.user.phone).then((isExist) => {
            if (isExist.length > 0) {
                verificationManager.sendSMS(phone).then((data) => {
                    res.json(data);
                });
            } else {
                if (req.body.user.name && req.body.user.name.length >= 3) {
                    req.body.user.isApproved = false;
                    userManager.add(req.body.user).then((userAdded) => {
                        if (userAdded === "success") {
                            verificationManager.sendSMS(phone).then((smsSent) => {
                                res.json(smsSent);
                            });
                        } else {
                            res.json(data);
                        }
                    });
                } else {
                    res.json({'error_text': 'not_exist_phone', 'status':'100'});
                }
            }
        });
    }
});

router.post('/verify', (req, res) => {
    verificationManager.verifyCode(req.body.code, req.body.request_id).then((verified) => {
        verified = JSON.parse(verified);
        if (verified.error_text) {
            res.json(verified)
        } else {
            req.body.user.isApproved = false;
                appointmentManager.add(req.body.appointment).then((appointment) => {
                    res.json({'success': 'success'});
            });
        }
    });
});

router.post('/exist', (req, res) => {
    let regex = /^05\d{8}$/;

    if (regex.test(req.body.phone)) {
        userManager.getByPhone(req.body.phone).then((isExist) => {
            if (isExist.length > 0) {
                res.json({'isExist': true});
            } else {
                res.json({'isExist': false});
            }
        });
    } else {
        res.json({'isExist': false});
    }
});

module.exports = router;