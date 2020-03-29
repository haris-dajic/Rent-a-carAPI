const request = require('supertest');
const {User} = require('../../models/user');
const {Vehicle} = require('../../models/vehicle');

let server;

describe('auth middleware', () => {

    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => { 
        server.close(); 
        await Vehicle.remove({});
    });

    let token;
    const exec = () => {
        return request(server).post('/api/vehicles')
        .set('x-auth-token', token)
        .send({brend: 'BMW'});
    };

    beforeEach(() => { token = new User().generateAuthToken();});

    it('should return 401 if token is not provided', async () => {
        token = '';
        const result = await exec();
        expect(result.status).toBe(401);
    });

    it('should return 400 if token is not valid', async () => {
        token = token + 1;
        const result = await exec();
        expect(result.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        const result = await exec();
        expect(result.status).toBe(200);
    });
});