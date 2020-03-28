const mongoose = require('mongoose');
const Joi = require('joi');

const vehicleSchema = new mongoose.Schema({
    brend: {type: String, required: true},
    fuel: {type: String, required: true},
    numberOfDoors: {type: Number, required: true},
    manufacturingDate: {type: Date, required: true},
    color: {type: String, required: false},
    isFree: {type: Boolean, required: true},
    numberOfPerson: {type: Number, required: true},
    licenceNumber: {type: String, required: true}
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

function validateVehicle(vehicle) {
    const schema = {
        brend: Joi.string().min(2).max(25).required(),
        fuel: Joi.string().min(3).max(10).required(),
        numberOfDoors: Joi.number().min(2).max(5).required(),
        manufacturingDate: Joi.date().required(),
        color: Joi.string().min(3).max(15),
        isFree: Joi.boolean().required(),
        numberOfPerson: Joi.number().max(5).required(),
        licenceNumber: Joi.string().required()

    };
    return Joi.validate(vehicle, schema);
}

function createNewVehicle(vehicle) {
    return new Vehicle({
        brend: vehicle.brend,
        fuel: vehicle.fuel,
        numberOfDoors: vehicle.numberOfDoors,
        manufacturingDate: vehicle.manufacturingDate,
        color: vehicle.color,
        isFree: vehicle.isFree,
        numberOfPerson: vehicle.numberOfPerson,
        licenceNumber: vehicle.licenceNumber
    });
}

function createVehicleObject(vehicle) {
    return {
        brend: vehicle.brend,
        fuel: vehicle.fuel,
        numberOfDoors: vehicle.numberOfDoors,
        manufacturingDate: vehicle.manufacturingDate,
        color: vehicle.color,
        isFree: vehicle.isFree,
        numberOfPerson: vehicle.numberOfPerson,
        licenceNumber: vehicle.licenceNumber
    };
}

exports.Vehicle = Vehicle;
exports.validate = validateVehicle;
exports.createVehicle = createNewVehicle;
exports.createVehicleObject = createVehicleObject;
exports.vehicleSchema = vehicleSchema;