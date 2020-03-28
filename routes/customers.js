const auth = require('../middleware/auth');
const {Customer, validate, createCustomer, createCustomerObject} = require('../models/customer');
const express = require('express');
const router = express.Router();


router.get('/', auth, async (req, res) => {
    const customer = await Customer.find();
    res.send(customer);
});

router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let newCustomer = createCustomer(req.body);
    newCustomer = await newCustomer.save();

    return res.send(newCustomer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send('There is no customer with given ID');

    res.send(Customer);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer =  await Customer.findByIdAndUpdate(req.params.id, createCustomerObject(req.body), { new : true});

    if(!customer) return res.status(404).send('There is no customer with given ID');
    res.send(customer);
});


router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send('There is no Customer with given ID');

    res.send(customer);
});



module.exports = router;