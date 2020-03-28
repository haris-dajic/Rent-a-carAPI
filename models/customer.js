const mongoose = require('mongoose');
const Joi = require('joi');


const customerSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true},
    adress: {type: String, required: true}
});

const Customer = mongoose.model('Customer', customerSchema);


function validateCustomer(customer) {
    const schema = {
        firstName: Joi.string().min(3).max(25).required(),
        lastName: Joi.string().min(3).max(25).required(),
        phone: Joi.string().min(3).max(25).required(),
        adress: Joi.string().min(10).max(70).required(),
    };
    return Joi.validate(customer, schema);
}

function createNewCustomer(customer) {
    return new Customer( {
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        adress: customer.adress
    });
}

function createCustomerObject(customer) {
    return  {
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        adress: customer.adress
    };
}

exports.Customer = Customer;
exports.validate = validateCustomer;
exports.createCustomer = createNewCustomer;
exports.createCustomerObject = createCustomerObject;
exports.customerSchema = customerSchema;