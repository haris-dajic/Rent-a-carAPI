const request = require('supertest');
const {User} = require('../../models/user');
const {Vehicle} = require('../../models/vehicle');

let server;

describe('auth middleware', () => {
    let token;
    beforeEach(() => { server = require('../../index'); token = new User().generateAuthToken();});
    afterEach(async () => { 
        await Vehicle.remove({});
        await server.close(); 
    });


    const exec = () => {
        return request(server).post('/api/vehicles')
        .set('x-auth-token', token)
        .send({
            brend: 'BMW',
            fuel: 'Benzin',
            numberOfDoors: 2,
            manufacturingDate: "2015-12-05T23:00:00.000Z",
            isFree: true,
            numberOfPerson: 4,
            licenceNumber: "145-M-225"
        });
    };

    beforeEach(() => { token = new User().generateAuthToken();});

    it('should return 401 if token is not provided', async () => {
        token = '';
        const result = await exec();
        expect(result.status).toBe(401);
    });

    it('should return 400 if token is not valid', async () => {
        token = 'a';
        const result = await exec();
        expect(result.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        const result = await exec();
        expect(result.status).toBe(200);
    });
});