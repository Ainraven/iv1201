const Sequelize = require('sequelize')
const User = require('../model/user')

class UserDAO {
    constructor() {

    }

    async getUserByID(id) {
        try {
            return await User.findByPk(id)
        } catch (error) {
            throw new Error("Error")
        }
    }
}

module.exports = UserDAO