const express = require("express");
const router = express.Router();
const UserManager = require("../managers/user.manager");


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

router.post('/sms', (req, res) => {
    let phone = '972' + req.body.phone.substr(1);

    userManager.sendSMS(phone).then((data) => {
        res.json(data);
    });
});

router.post('/verify', (req, res) => {
    userManager.verifyCode(req.body.code, req.body.request_id).then((data) => {
        res.json(data);
    });
});

router.delete('/users', (req, res) => {
    userManager.delete().then((data) => {
        res.json(data);
    }).catch((err) => {console.log(err);});
});

module.exports = router;