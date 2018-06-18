const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const app = express();


// API file for interacting with MongoDB
const users = require('./controllers/user.controller');
const appointments = require('./controllers/appointment.controller');
const products = require('./controllers/product.controller');
const types = require('./controllers/appointment-type.controller');
const verification = require('./controllers/verification.controller');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'authorization,content-type');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    next();
});

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

//Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', users);
app.use('/api', appointments);
app.use('/api', products);
app.use('/api', types);
app.use('/api', verification);

// Send all other requests to the Angular app
/*
app.get('*' , (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});*/
 
// Set port
const port = process.env.PORT || '3000'
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
mongoose.connect('mongodb://misha:Misha123@ds247410.mlab.com:47410/dbbarbershop');