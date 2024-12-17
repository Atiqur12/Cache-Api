const supertest = require('supertest');
const getApp = require('../tests/setupTests');

let app;

beforeAll(() => {
    app = getApp(); // Get the app instance from setupTests.js
});

describe('Cache System API', () => {
    test('POST /cache should add data to the cache', async () => {
        const data = { key: 'testKey', value: 'testValue', ttl: 60 };

        const response = await supertest(app)
            .post('/cache')
            .send(data)
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toEqual({ message: 'Data added to cache' });
    });

    test('GET /cache/testKey should retrieve the cached data', async () => {
        const response = await supertest(app)
            .get('/cache/testKey')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toEqual({ value: 'testValue' });
    });

    test(
        'GET /cache/testKey should return 404 after TTL expiry',
        async () => {
            await new Promise((resolve) => setTimeout(resolve, 65000));

            const response = await supertest(app)
                .get('/cache/testKey')
                .expect(404);

            expect(response.body).toEqual({ error: 'Key not found or expired' });
        },
        70000
    );
});
