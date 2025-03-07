const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    console.log('Checking token...')
    const token = req.headers.authorisation?.split(' ')[1]
    console.log('Token received:', token)

    if(!token) {
        console.log('No token provided')
        return res.status(401).json({message: "Unathorised"})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            console.log('Token verification failed')
            return res.status(403).json({message: "Forbidden"})
        } 
        console.log('User verified:', user)
        req.user = user
        next()
    })
}

module.exports = authenticateToken