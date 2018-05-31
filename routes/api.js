const express = require("express");
const router = express.Router();


// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
        if (err) return console.log(err);


        closure(db);
    });
};

const sendError = (err, res) => {
    Response.status = 501;
    respoonse.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(respoonse);
};

let response = {
    status: 200,
    data: [],
    message: null
};

