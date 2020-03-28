const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
//const passwordComplexity = require('joi-password-complexity');



const userSchema = new  mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50},
    username: { type: String, required: true, unique: true, minlength: 5, maxlength: 255},
    email: { type: String, required: true, unique: true, minlength: 5, maxlength: 255},
    password: { type: String, required: true, minlength: 8, maxlength: 1024}
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

// const passwordComplexityOptions = {
//     min: 10,
//     max: 30,
//     lowerCase: 1,
//     upperCase: 1,
//     numeric: 1,
//     symbol: 1,
//     requirementCount: 2,
//   }


function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        username: Joi.string().min(5).max(255).required(),
        email:  Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    }
    return Joi.validate(user, schema);
}

function createNewUser(user) {
    return new User({
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password
    });
}

module.exports.User = User;
module.exports.validate = validateUser;
module.exports.createUser = createNewUser;


