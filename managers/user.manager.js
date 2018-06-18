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

    sendSMS(phone) {
        const postData = JSON.stringify({
            'api_key': '8d403565',
            'api_secret' : 'g57XOnXodLEKNzz0',
            'number' : phone,
            'brand':'BOOOOOOM'
        });

        const options = {
            hostname: 'api.nexmo.com',
            port: 443,
            path: '/verify/json',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            },
            data: postData
        };

        return new Promise((resolve, reject) => {
            let httpreq = https.request(options, (res) => {
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    resolve(data);
                });
                res.on('end', () => {
                });
            });

            httpreq.on('error', (err) => {
                reject(err);
            });

            httpreq.write(postData);
            httpreq.end();
        });
    }

    verifyCode(code, request_id) {
        const postData = JSON.stringify({
            'api_key': '8d403565',
            'api_secret' : 'g57XOnXodLEKNzz0',
            'request_id' : request_id,
            'code' : code
        });

        const options = {
            hostname: 'api.nexmo.com',
            port: 443,
            path: '/verify/check/json',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            },
            data: postData
        };

        return new Promise((resolve, reject) => {
            let httpreq = https.request(options, (res) => {
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    resolve(data);
                });
                res.on('end', () => {
                });
            });

            httpreq.on('error', (err) => {
                reject(err);
            });

            httpreq.write(postData);
            httpreq.end();
        });
    }

}
exports.UserManager = UserManager;