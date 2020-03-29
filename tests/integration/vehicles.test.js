const request = require('supertest');
const { Vehicle } = require('../../models/vehicle');
const { User } = require('../../models/user');

let server;

describe('/api/vehicles', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => {
        server.close();
        await Vehicle.remove({});
    });

    describe('GET /', () => {

        let vehicle1 = {
            brend: 'BMW',
            fuel: 'Benzin',
            numberOfDoors: 2,
            manufacturingDate: "2015-12-05T23:00:00.000Z",
            isFree: true,
            numberOfPerson: 4,
            licenceNumber: "145-M-225"
        };
        let vehicle2 = {
            brend: 'Audi',
            fuel: 'Benzin',
            numberOfDoors: 2,
            manufacturingDate: "2015-12-05T23:00:00.000Z",
            isFree: true,
            numberOfPerson: 4,
            licenceNumber: "145-M-225"
        };

        it('should return all vehicles', async () => {
            await Vehicle.collection.insertMany([vehicle1, vehicle2]);
            const result = await request(server).get('/api/vehicles');
            expect(result.status).toBe(200);
            expect(result.body.length).toBe(2);
            expect(result.body.some(v => v.brend === 'BMW')).toBeTruthy();
            expect(result.body.some(v => v.brend === 'Audi')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {

        let vehicleInput = {
            brend: 'BMW',
            fuel: 'Benzin',
            numberOfDoors: 2,
            manufacturingDate: "2015-12-05T23:00:00.000Z",
            isFree: true,
            numberOfPerson: 4,
            licenceNumber: "145-M-225"
        };

        it('should return vehicle if valid id is passed', async () => {
            const vehicle = new Vehicle(vehicleInput);
            await vehicle.save();
            const result = await request(server).get('/api/vehicles/' + vehicle._id);
            expect(result.status).toBe(200);
            expect(result.body).toHaveProperty('brend', vehicle.brend);
        });

        it('should return status 404 if there is no vehicles with passed id', async () => {
            const result = await request(server).get('/api/vehicles/' + 123);
            expect(result.status).toBe(404);
        });
    });

    describe('POST /', () => {

        let vehicle;

        const setVehicle = () => {
            vehicle = {
                brend: 'BMW',
                fuel: 'Benzin',
                numberOfDoors: 2,
                manufacturingDate: "2015-12-05T23:00:00.000Z",
                isFree: true,
                numberOfPerson: 4,
                licenceNumber: "145-M-225"
            };
        };

        const exec = () => {
            return request(server)
                .post('/api/vehicles/')
                .set('x-auth-token', token)
                .send(vehicle);
        };

        beforeEach(() => { const user = new User(); token = user.generateAuthToken(); setVehicle();});

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const result = await exec();
            expect(result.status).toBe(401);
        });

        it('should return 400 if input is not valid', async () => {
            vehicle = { brend: 'Ford' };
            const result = await exec();
            expect(result.status).toBe(400);
        });

        it('should return 200 if input is valid', async () => {
            const result = await exec();
            expect(result.status).toBe(200);
            expect(result.body).toMatchObject(vehicle);
        });

        it('should return 400 if input is bigger than expected', async () => {
            vehicle.brend = new Array(27).join('a');
            const result = await exec();
            expect(result.status).toBe(400);
        });
    });
});
