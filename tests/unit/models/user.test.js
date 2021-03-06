const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const { User } = require('../../../models/user');


describe('user.generateAuthToken', () => {
    it('should return valid jwt', () => {
        const payload = { _id: mongoose.Types.ObjectId().toHexString()};
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    });
});