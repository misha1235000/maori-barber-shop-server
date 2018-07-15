let AppointmentType = require('../models/appointment-type.model');

class AppointmentTypeManager {
    /**
     * Gets all the appointment-types.
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
     * Adds an appointment-type.
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
     * Deletes an appointment-type.
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