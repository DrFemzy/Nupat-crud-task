const jwt = require('jsonwebtoken');

const generateBearerToken = (userId) => {
    return jwt.sign(userId, process.env.JWT_SECRET, {expiresIn: "86400000"});
}


module.exports = generateBearerToken