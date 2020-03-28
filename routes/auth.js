const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();


router.post('/login', async (req, res) => {
    const {error} = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    let user = await User.findOne({ username: req.body.username});
    if(!user) return res.status(400).send('Invalid username or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword)return res.status(400).send('Invalid username or password.');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(user) {
    const schema = {
        username: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(8).max(255).required()
    }
    return Joi.validate(user, schema);
}

module.exports = router;