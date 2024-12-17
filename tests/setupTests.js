let app;
const server = require('../src/server');

beforeAll((done) => {
    app = server.listen(0, () => {
        console.log(`Test server running on port ${app.address().port}`);
        done();
    });
});

afterAll((done) => {
    if (app) {
        app.close(() => {
            console.log('Test server closed');
            done();
        });
    }
});

module.exports = () => app;
