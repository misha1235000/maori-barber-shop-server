const express = require("express");
const router = express.Router();
const ProductManager = require("../managers/product.manager");

let productManager = new ProductManager.ProductManager();

router.get('/product', (req, res) => {
    productManager.get().then((data) => {
        res.json(data);
    });
});

router.post('/product', (req, res) => {
    productManager.add(req.body.product).then((data) => {
        res.json(data);
    });
});

router.delete('/product', (req, res) => {
    productManager.delete(req.body._id).then((data) => {
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