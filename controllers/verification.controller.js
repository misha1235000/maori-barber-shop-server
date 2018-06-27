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
        res.json({'error_text': 'מספר שגוי'})
    } else {
        userManager.getByPhone(req.body.user.phone).then((isExist) => {
            if (isExist.length > 0) {
                phone = '972' + req.body.user.phone.substr(1);
                verificationManager.
                endSMS(phone).then((data) => {
                    res.json(data);
                });
            } else {
                if (req.body.name && req.body.name.length >= 3) {
                    
                } else {
                    res.json({'error_text': 'not_exist_phone', 'status':'100'});
                }
            }
        });
    }
});

router.post('/verify', (req, res) => {
    //verificationManager.verifyCode(req.body.code, req.body.request_id).then((verified) => {
    //    if (verified.error_text) {
     //       res.json(verified)
     //   } else {
            req.body.user.isApproved = false;
            userManager.add(req.body.user).then((user) => {
                appointmentManager.add(req.body.appointment).then((appointment) => {
                    res.json({'success': 'success'});
            });
    //       });
    //    }
        //res.json(data);
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