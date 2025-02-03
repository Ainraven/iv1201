const userService = require('../service/userService')

class Controller {

    constructor() {}

    async getUser(req, res) {
        try {
            const user = await userService.getUserById(req.param.id)
            if(!user) return res.status(404).json({message: "User not found"})
        }
        catch (error) {
            res.status(500).json({message: error.message})
        }
    }

}

module.exports = Controller