const jwt = require('jsonwebtoken');

const generateBearerToken = (userId) => {
    return jwt.sign(userId, process.env.JWT_SECRET);
}


module.exports = generateBearerToken