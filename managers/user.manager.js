/*const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;*/
const https = require('https');
const User = require('../models/user.model');
const querystring = require('querystring');

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

    getByPhone(phone) {
        return new Promise((resolve, reject) => {
            User.find({'phone': phone}, (err, user) => {
                if (err) {
                    reject(500);
                }

                resolve(user);
            });
        }).catch((err) => {console.log(err);});
    }

    add(user) {
        return new Promise((resolve, reject) => {
            let newUser = new User(user);
            newUser.save((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("success");
                }
            });
        }).catch((err) => {console.log(err);});
    }

    delete(id) {
        return new Promise ((resolve, reject) => {
            User.findOneAndRemove({_id: id}, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        }).catch((err) => {console.log(err);});
    }

}
exports.UserManager = UserManager;