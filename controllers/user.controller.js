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

router.delete('/users', (req, res) => {
    userManager.delete().then((data) => {
        res.json(data);
    });
});

module.exports = router;