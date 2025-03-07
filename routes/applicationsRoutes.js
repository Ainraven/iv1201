const express = require("express")
const router = express.Router()
const Controller = require("../controller/controller")
const authenticateToken = require('../middleware/authorisationMiddle')

const contr = new Controller()

router.get('/', authenticateToken, (req, res) => {
    if(req.user.role_id !== 1){
        return res.status(403).json({message: "Access Denied"})
    }
    else{
        res.render('applicationsView')
    }
})

module.exports = router