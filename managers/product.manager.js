let Product = require('../models/product.model');

class ProductManager {
    /**
     * Gets all the products.
     */
    get() {
        return new Promise((resolve, reject) => {
            Product.find({}, (err, products) => {
                if (err) {
                    reject(err);
                }

                resolve(products);
            });
        }).catch((err) => {console.log(err);});
    }

    /**
     * Adds a product.
     * @param {*} product 
     */
    add(product) {
        return new Promise((resolve, reject) => {
            let newProduct = new Product(product);
            newProduct.save((err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        }).catch((err) => {console.log(err);});
    }

    /**
     * Deletes a product by ID.
     * @param {*} id 
     */
    delete(id) {
        return new Promise ((resolve, reject) => {
            Product.findOneAndRemove({_id: id}, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
}

exports.ProductManager = ProductManager;