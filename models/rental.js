const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { customerSchema } = require('./customer');
const { vehicleSchema } = require('./vehicle');


const Rental = mongoose.model('Rental',  new mongoose.Schema({
    deposit: {type: Number, required: false},
    damageInsurance: {type: String, require: false},
    totalCost: { type: Number, required: true},
    customer: { type: customerSchema, required: true},
    vehicle: { type: vehicleSchema, require: true}
}));

function validateRental(rental) {
    const schema = {
        deposit: Joi.number(),
        damageInsurance: Joi.string(),
        totalCost: Joi.number().required(),
        customerId: Joi.objectId().required(),
        vehicleId: Joi.objectId().required()
    };
    return Joi.validate(rental, schema);
}

function createNewRental(rental, customer, vehicle) {
    return new Rental({
        deposit: rental.deposit,
        damageInsurance: rental.damageInsurance,
        totalCost: rental.totalCost,
        customer: {
            _id: customer._id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            phone: customer.phone,
            adress: customer.adress
        },
        vehicle: {
            _id: vehicle._id,
            brend: vehicle.brend,
            fuel: vehicle.fuel,
            numberOfDoors: vehicle.numberOfDoors,
            manufacturingDate: vehicle.manufacturingDate,
            color: vehicle.color,
            isFree: vehicle.isFree,
            numberOfPerson: vehicle.numberOfPerson,
            licenceNumber: vehicle.licenceNumber
        }
    });
}

function createRentalObject(rental, customer, vehicle) {
    return {
        deposit: rental.deposit,
        damageInsurance: rental.damageInsurance,
        totalCost: rental.totalCost,
        customer: {
            _id: customer._id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            phone: customer.phone,
            adress: customer.adress
        },
        vehicle: {
            _id: vehicle._id,
            brend: vehicle.brend,
            fuel: vehicle.fuel,
            numberOfDoors: vehicle.numberOfDoors,
            manufacturingDate: vehicle.manufacturingDate,
            color: vehicle.color,
            isFree: vehicle.isFree,
            numberOfPerson: vehicle.numberOfPerson,
            licenceNumber: vehicle.licenceNumber
        }
    };
}

exports.Rental = Rental;
exports.validate = validateRental;
exports.createRental = createNewRental;
exports.createRentalObject = createRentalObject;