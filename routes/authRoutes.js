const express = require("express")
const router = express.Router()
const Controller = require("../controller/controller")

const contr = new Controller()

router.post("/login", (req, res) => contr.login(req, res))

module.exports = router