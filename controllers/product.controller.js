const express = require("express");
const router = express.Router();
const ProductManager = require("../managers/product.manager");

let productManager = new ProductManager.ProductManager();

router.get('/product', (req, res) => { // Gets all products.
    productManager.get().then((data) => {
        res.json(data);
    });
});

router.post('/product', (req, res) => { // Creates a new product.
    productManager.add(req.body.product).then((data) => {
        res.json(data);
    });
});

router.delete('/product', (req, res) => { // Deletes a product by id.
    productManager.delete(req.body._id).then((data) => {
        res.json(data);
    });
});

module.exports = router;