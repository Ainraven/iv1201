const express = require("express")
const router = express.Router()
const Controller = require("../controller/controller")

const contr = new Controller()

router.get('/login', (req, res) => {
    res.render('loginView')
})
router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post("/login/api", (req, res) => contr.login(req, res))

module.exports = router