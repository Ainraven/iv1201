const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token) {
        console.log('No token provided')
        return res.status(401).json({message: "Unathorised"})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            console.log('Token verification failed')
            return res.status(403).json({message: "Forbidden"})
        } 
        req.user = user
        next()
    })
}

module.exports = authenticateToken