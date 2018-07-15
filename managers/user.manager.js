const User = require('../models/user.model');

class UserManager {
    /**
     * Gets all the users.
     */
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

    /**
     * Gets user by phone.
     * @param {*} phone 
     */
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

    /**
     * Adds a user.
     * @param {*} user 
     */
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

    /**
     * Deletes a user by ID.
     * @param {*} id 
     */
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