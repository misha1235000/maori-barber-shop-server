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
        }).catch((err) => { console.log(err); });
    }

    getByDate(date) {
        return new Promise((resolve, reject) => {
            Appointment.find({ 'dateFilter': date }, (err, appointments) => {
                if (err) {
                    reject(err);
                }

                resolve(appointments.map((appointment) => {return {dateto:appointment.dateto, datefrom:appointment.datefrom}}));
            });
        }).catch((err) => { console.log(err); });
    }

    getByMonth(month) {
        return new Promise((resolve, reject) => {
            Appointment.find({ 'dateFilter': { $regex: month, $options: 'i'}}, (err, appointments) => {
                if (err) {
                    reject(err);
                }

                let daysArray = [];
                let currDayArray = [];

                for (let i = 0; i < 31; i++) {
                    currDayArray = [];

                    appointments.forEach(appointment => {
                        if (appointment.dateFilter.split('-')[0] === i.toString()) {
                            currDayArray.push(appointment);
                        }
                    });

                    daysArray.push(currDayArray);
                }
                console.log('test');
                resolve(appointments.map((appointment) => {return {dateto:appointment.dateto, datefrom:appointment.datefrom}}));
            });
        }).catch((err) => { console.log(err); });
    }

    add(appointment) {
        return new Promise((resolve, reject) => {
            let newAppointment = new Appointment(appointment);
            console.log(newAppointment);
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