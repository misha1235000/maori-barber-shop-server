let Appointment = require('../models/appointment.model');

class AppointmentManager {
    get() {
        return new Promise((resolve, reject) => {
            Appointment.find({}, (err, appointments) => {
                if (err) {
                    reject(err);
                }

                resolve(appointments);
            });
        }).catch((err) => {console.log(err);});
    }

    add(appointment) {
        return new Promise((resolve, reject) => {
            let newAppointment = new Appointment(appointment);
            newAppointment.save((err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        }).catch((err) => {console.log(err);});
    }

    delete(id) {
        return new Promise ((resolve, reject) => {
            Appointment.findOneAndRemove({_id: id}, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        }).catch((err) => {console.log(err);});
    }
}

exports.AppointmentManager = AppointmentManager;