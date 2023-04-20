const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const bearer = authHeader && authHeader.split(' ')[0]

    if(bearer !== "Bearer") {
        return res.status(401).json({
            error: true,
            message: "Access Denied 😔"
        })

    } 


    // Check for invalid token (or token absence)
    if(!token){
        return res.status(401).json({
            error: true,
            message: "Access Denied 😔"
        })

    } 

    // verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
        if(err){
            return res.status(403).json({
                error: true,
                message: "Invalid Token 😔"
            })
        }

        // Populate the userId in the request Obj
        req.userId = userId
        next()
    })
}

module.exports = { authenticateToken }