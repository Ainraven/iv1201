const UserDAO = require('../integration/userDAO')

class UserService {
    constructor() {}

    async getUserById(id){
        return await UserDAO.getUserById(id)
    }
}

module.exports = UserService