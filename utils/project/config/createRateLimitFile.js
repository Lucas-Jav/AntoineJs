const fs = require('fs');

const createRateLimitFile = () => {
    fs.writeFileSync('./config/rateLimit.js', 
`const rateLimit = require('express-rate-limit');

// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite de 100 requisições por IP
});

module.exports = limiter;`
    );
};

module.exports = { createRateLimitFile };