const express = require('express');

const vehicles = require('../routes/vehicles')
const home = require('../routes/home');
const customers = require('../routes/customers');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');


module.exports = function (app) {
    app.use(express.json());
    //app.use(express.urlencoded());
    app.use('/api/vehicles', vehicles);
    app.use('/api/customers', customers);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/', home);
    app.use(error);
}