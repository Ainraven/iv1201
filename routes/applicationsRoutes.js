const express = require("express")
const router = express.Router()
const Controller = require("../controller/controller")

const contr = new Controller()

router.get('/', (req, res) => {
    res.render('applicationsView')
})

module.exports = router