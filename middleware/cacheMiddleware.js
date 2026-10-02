const cache = {};
const TTL = 60 * 1000;

function checkCache(req, res, next) {
    if (req.method !== 'GET') {
        return next();
    }

    let key = req.originalUrl || req.url;
    let cachedEntry = cache[key];
    let currentTime = Date.now();

    if (cachedEntry) {
        let isExpired = (currentTime - cachedEntry.createdAt) > TTL;
        if (!isExpired) {
            res.setHeader('X-Cache', 'HIT');
            return res.json(cachedEntry.value);
        } else {
            delete cache[key];
        }
    }

    res.setHeader('X-Cache', 'MISS');

    let originalJson = res.json.bind(res);
    res.json = (data) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache[key] = {
                value: data,
                createdAt: Date.now()
            };
        }
        return originalJson(data);
    };

    next();
}

function invalidateCache(req, res, next) {
    let originalJson = res.json.bind(res);
    res.json = (data) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            for (let key in cache) {
                delete cache[key];
            }
        }
        return originalJson(data);
    };
    next();
}

module.exports = {
    checkCache,
    invalidateCache,
    cache
};
