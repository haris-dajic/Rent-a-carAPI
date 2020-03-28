const {Rental, validate, createRental, createRentalObject} = require('../models/rental');
const { Customer } = require('../models/customer');
const { Vehicle } = require('../models/vehicle');

const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const rentals = await Rental.find();
    res.send(rentals);
});

router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer!');

    const vehicle = await Vehicle.findById(req.body.vehicleId);
    if(!vehicle) return res.status(400).send('Invalid vehicle!');

    let newRental = createRental(req.body, customer._doc, vehicle._doc);
    newRental = await newRental.save();

    return res.send(newRental);
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(404).send('There is no rental with given ID');

    res.send(rental);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer!');

    const vehicle = await Vehicle.findById(req.body.vehicleId);
    if(!vehicle) return res.status(400).send('Invalid vehicle!');

    const rental =  await Rental.findByIdAndUpdate(req.params.id, 
                createRentalObject(req.body, customer._doc, vehicle._doc), { new : true});

    if(!rental) return res.status(404).send('There is no rental with given ID');
    res.send(rental);
});


router.delete('/:id', async (req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id);
    if(!rental) return res.status(404).send('There is no rental with given ID');

    res.send(rental);
});



module.exports = router;