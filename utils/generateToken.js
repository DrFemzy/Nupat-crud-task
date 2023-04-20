const jwt = require('jsonwebtoken');

const generateBearerToken = (userId) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 3600,
        data: userId,
    }, process.env.JWT_SECRET);
}


module.exports = generateBearerToken