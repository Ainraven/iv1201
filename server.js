const express = require('express')
const router = express.Router()
const app = express()

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    console.log("root")
    res.render('../api/index')
})

const userRouter = require('./routes/users')
app.use('/users', userRouter)

app.listen(1337)