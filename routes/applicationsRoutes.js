const express = require("express")
const router = express.Router()
const Controller = require("../controller/controller")
const authenticateToken = require('../middleware/authorisationMiddle')

const contr = new Controller()

router.get('/', (req, res) => {
    res.render('applicationsView')
})

router.get("/api", authenticateToken, (req, res) => {
    if (req.user.role_id !== 1) {
        return res.status(403).json({ message: "Access Denied" })
    }
    // Fetch and return applications (Modify as needed)
    res.json({ message: "Applications data here..." })
})

module.exports = router