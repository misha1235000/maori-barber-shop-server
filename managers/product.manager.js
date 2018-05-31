let Product = require('../models/product.model');

class ProductManager {
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