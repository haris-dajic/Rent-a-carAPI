const {Vehicle, validate, createVehicle, createVehicleObject} = require('../models/vehicle');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const vehicles = await Vehicle.find();
    res.send(vehicles);
});

router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let newVehicle = createVehicle(req.body);
    newVehicle = await newVehicle.save();

    return res.send(newVehicle);
});

router.get('/:id', async (req, res) => {
    const vehicle = await Vehicle.findById(req.params.id);
    if(!vehicle) return res.status(404).send('There is no vehicle with given ID');

    res.send(vehicle);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const vehicle =  await Vehicle.findByIdAndUpdate(req.params.id, createVehicleObject(req.body), { new : true});

    if(!vehicle) return res.status(404).send('There is no vehicle with given ID');
    res.send(vehicle);
});


router.delete('/:id', async (req, res) => {
    const vehicle = await Vehicle.findByIdAndRemove(req.params.id);
    if(!vehicle) return res.status(404).send('There is no vehicle with given ID');

    res.send(vehicle);
});



module.exports = router;