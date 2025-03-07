const jwt = require("jsonwebtoken")

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorisation?.split(' ')[1]
    if(!token) return res.status(401).json({message: "Unathorised"})

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: "Forbidden"})
        req.user = user
        next()
    })
}

module.exports = {authenticateToken}