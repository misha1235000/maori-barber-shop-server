const express = require("express");
const router = express.Router();
const VerificationManager = require("../managers/verification.manager");
const UserManager = require("../managers/user.manager");
const AppointmentManager = require("../managers/appointment.manager");

const userManager = new UserManager.UserManager();
const verificationManager = new VerificationManager.VerificationManager();
const appointmentManager = new AppointmentManager.AppointmentManager();

router.post('/auth', (req, res) => { // Sends post request to authenticate with a user by an SMS.
    const regex = /^05\d{8}$/;
    let phone;

    if (!regex.test(req.body.user.phone)) { // If the phone syntax isn't valid.
        res.json({'error_text': 'מספר שגוי'})
    } else { // If the phone syntax is valid.
        phone = '972' + req.body.user.phone.substr(1); // Format the phone as needed. (Without the '0' and with an area code).

        userManager.getByPhone(req.body.user.phone).then((isExist) => { // Searches for the user.
            if (isExist.length > 0) { // If the user exists.
                verificationManager.sendSMS(phone).then((data) => { // Send the authentication SMS to the user.
                    res.json(data);
                });
            } else { // If the user doesn't exist.
                if (req.body.user.name && req.body.user.name.length >= 3) { // Checks if the user name is valid.
                    req.body.user.isApproved = false; // Sets the approved to false by default.

                    userManager.add(req.body.user).then((userAdded) => { // Add the user to the DB.
                        if (userAdded === "success") { // If the user addition succeed.
                            verificationManager.sendSMS(phone).then((smsSent) => { // Send authentication SMS to the user that was created.
                                res.json(smsSent);
                            });
                        } else { // If the user addition failed.
                            res.json(data);
                        }
                    });
                } else { // If the user name isn't valid.
                    res.json({'error_text': 'not_exist_phone', 'status':'100'});
                }
            }
        });
    }
});

router.post('/auth/verify', (req, res) => { // Send POST request to verify the SMS.
    verificationManager.verifyCode(req.body.code, req.body.request_id).then((verified) => { // Verify the code, and get the indication.
        verified = JSON.parse(verified);

        if (verified.error_text) { // If there was an error - send it.
            res.json(verified.error_text);
        } else { // If there are no errors.
                appointmentManager.add(req.body.appointment).then((appointment) => { // Create the appointment that was sent in the request.
                    res.json({'success': 'success'});
            });
        }
    });
});

router.post('/auth/exist', (req, res) => { // Checks whether the phone exists in the DB or not.
    let regex = /^05\d{8}$/;

    if (regex.test(req.body.phone)) { // If the phone syntax is valid.
        userManager.getByPhone(req.body.phone).then((isExist) => { // Search for the specified phone.
            if (isExist.length > 0) { // If array is not empty.
                res.json({'isExist': true});
            } else { // If the array is empty.
                res.json({'isExist': false});
            }
        });
    } else { // If the phone syntax isn't valid.
        res.json({'isExist': false});
    }
});

module.exports = router;