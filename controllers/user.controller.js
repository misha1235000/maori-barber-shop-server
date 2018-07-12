const express = require("express");
const router = express.Router();
const UserManager = require("../managers/user.manager");

let userManager = new UserManager.UserManager();

router.get('/user', (req, res) => { // Gets all users.
    userManager.get().then((data) => {
        res.json(data);
    });
});

router.post('/user', (req, res) => { // Adds a new user.
    userManager.add(req.body.user).then((data) => {
        res.json(data);
    });
});

router.delete('/user', (req, res) => { // Deletes a user.
    userManager.delete(req.body._id).then((data) => {
        res.json(data);
    });
});

module.exports = router;