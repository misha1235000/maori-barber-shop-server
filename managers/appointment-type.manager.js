let AppointmentType = require('../models/appointment-type.model');

class AppointmentTypeManager {
    /**
     * 
     */
    get() {
        return new Promise((resolve, reject) => {
            AppointmentType.find({}, (err, appointmentTypes) => { //
                if (err) {
                    reject(err);
                }

                resolve(appointmentTypes);
            });
        }).catch((err) => {console.log(err);});
    }

    /**
     * 
     * @param {*} appointmentType 
     */
    add(appointmentType) {
        return new Promise((resolve, reject) => {
            let newAppointmentType = new AppointmentType(appointmentType);
            newAppointmentType.save((err, data) => {
                if (err) {
                    reject(err);
                }

                resolve(data);
            });
        }).catch((err) => {console.log(err);});
    }

    /**
     * 
     * @param {*} id 
     */
    delete(id) {
        return new Promise ((resolve, reject) => {
            AppointmentType.findOneAndRemove({_id: id}, (err, data) => {
                if(err) {
                    reject(err);
                }

                resolve(data);
            })
        }).catch((err) => {console.log(err);});
    }
}

exports.AppointmentTypeManager = AppointmentTypeManager;