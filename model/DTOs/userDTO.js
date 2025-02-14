/**
 * Data Transferable Object for a user of any kind
 * @DTO
 */

const Validator = require('../../util/validators')

class UserDTO {

    /**
     * 
     * @param {number} id 
     * @param {string} username 
     * @param {string} password 
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {number} personalNumber 
     * @param {string} email 
     * @param {integer} role 
     */
    constructor(id, username, password, firstName, lastName, personalNumber, email, role){
        Validator.isNotNegativeInteger(id)
        Validator.isValidUsername(username)
        Validator.isStrongPassword(password)
        Validator.isValidName(firstName)
        Validator.isValidName(lastName)
        Validator.isPersonalNumber(personalNumber)
        Validator.isValidEmail(email)
        Validator.isNotNegativeInteger(role)
        this.id  = id
        this.username = username
        this.password = password
        this.firstName = firstName
        this.lastName = lastName
        this.personalNumber = personalNumber
        this.email = email
        this.role = role
    }
}

module.exports = UserDTO