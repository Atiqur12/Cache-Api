const CacheModel = require('./cacheModel');

function handlePostRequest(req, res) {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const { key, value, ttl } = JSON.parse(body);
            CacheModel.set(key, value, ttl);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Data added to cache' }));
        } catch (e) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
    });
}

function handleGetRequest(req, res) {
    const key = req.url.split('/')[2];
    const value = CacheModel.get(key);

    if (value === null) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Key not found or expired' }));
    } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ value }));
    }
}

module.exports = {
     handlePostRequest, handleGetRequest 

};