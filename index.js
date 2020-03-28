require('express-async-errors');
const winston = require('winston');
const error = require('./middleware/error');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const vehicles = require('./routes/vehicles')
const home = require('./routes/home');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

// process.on('uncaughtException', (ex) => {
//         console.log('WE GOT A UNCAUGHT EXCEPTION');
//         winston.error(ex.message, ex);
// });

winston.handleExceptions(new winston.transports.File({
        filename: 'uncaughtExceptions.log'
}));

process.on('unhandledRejection', (ex) => {
        throw ex;
});

winston.add(winston.transports.File, { filename: 'logfile.log'});

if(!config.get('jwtPrivateKey')){
        console.error('FATAL ERROR: jwtPrivateKey is not defined');
        process.exit(1);
}

//Testing unhandledRejection
// const p = Promise.reject(new Error('Handle'));
// p.then(() => console.log('Doneee'));

mongoose.connect('mongodb://localhost/rentacar')
        .then(() => console.log('Connected to the MongoDB...'))
        .catch(() => console.error('Failed connection on the MongoDB'));

app.use(express.json());
//app.use(express.urlencoded());
app.use('/api/vehicles', vehicles);
app.use('/api/customers', customers);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', home);

app.use(error);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));



