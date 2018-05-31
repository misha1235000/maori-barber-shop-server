/*const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;*/
let User = require('../models/user.model');

class UserManager {
    get() {
        return new Promise((resolve, reject) => {
            User.find({}, (err, users) => {
                if (err) {
                    reject(500);
                }

                resolve(users);
            });
        }).catch((err) => {console.log(err);});
    }
    add(user) {
        return new Promise((resolve, reject) => {
            let newUser = new User(user);
            newUser.save((err) => {
                if (err) {
                    reject(500);
                } else {
                    resolve("User Created");
                }
            });
        }).catch((err) => {console.log(err);});
    }

    delete() {
        return new Promise((resolve, reject) => {
            User.findOneAndRemove({}, (err) => {
                if (err) {
                    reject(500);
                }
                    resolve("User Removed");
                });
        }).catch((err) => {console.log(err);});
    }
}
exports.UserManager = UserManager;