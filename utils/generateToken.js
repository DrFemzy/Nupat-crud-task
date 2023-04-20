const jwt = require('jsonwebtoken');

const generateBearerToken = (userId) => {
    return jwt.sign(userId, process.env.JWT_SECRET, {expiresIn: "1h"});
}


module.exports = generateBearerToken