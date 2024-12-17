const cache = new Map();

class CacheModel {
    static set(key, value, ttl) {
        const expiry = Date.now() + ttl * 1000;
        cache.set(key, { value, expiry });
    }

    static get(key) {
        if (cache.has(key)) {
            const entry = cache.get(key);
            if (Date.now() > entry.expiry) {
                cache.delete(key);
                return null;
            }
            return entry.value;
        }
        return null;
    }

    static clear() {
        cache.clear();
    }
}

module.exports = CacheModel;
