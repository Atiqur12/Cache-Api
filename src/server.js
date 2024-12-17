const http = require('http');
const { handlePostRequest, handleGetRequest } = require('./cacheController');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/cache') {
        handlePostRequest(req, res);
    } else if (req.method === 'GET' && req.url.startsWith('/cache/')) {
        handleGetRequest(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});


module.exports = server;
