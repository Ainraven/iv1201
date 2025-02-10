const assert = require('assert').strict
const validator = require('validator')

class Validators {
    /**
     * Checks if the value is a positive integer or 0
     * 
     * @param {*} value to be checked
     */
    static isNotNegativeInteger(value) {
        assert.equal(typeof value, "number", "Not a number")
        assert(Number.isInteger(value), "Not an integer")
        assert(value >= 0, "Not a positive integer")
    }

    /**
     * Counts amount of digits in an integer
     * 
     * @param {*} number a positive integer
     * @returns number of digits
     */
    static getDigitLength(number) {
        var numberOfDigits = 1
        while(true){
            if(number < 10**numberOfDigits)
                return number
            numberOfDigits++
        }
    }

    /**
     * Checks if value is a valid personal number by the amount of digits in it. Either 12 or 10:
     * 12: YYYYMMDDXXXX
     * 10: YYMMDDXXXX
     * @param {*} value to be checked
     */
    static isPersonalNumber(value) {
        Validators.isPositiveInteger(value)
        assert(value.getDigitLength(value) == (12 || 10))
    }

    /**
     * Checks if value is a valid username, alphanumerical strings only
     * @param {*} value 
     */
    static isValidUsername(value) {
        validator.isAlphanumeric(value)
    }

    /**
     * Checks if value is a valid password
     * @param {*} value 
     */
    static isValidPassword(value) {
        validator.isStrongPassword(value, {minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1})
    }

    /**
     * Checks if a name string is alphabetic
     * @param {*} value 
     */
    static isValidName(value){
        validator.isAlpha(value)
    }

    /**
     * Checks if the value is a valid email
     * @param {*} value 
     */
    static isValidEmail(value){
        validator.isEmail(value)
    }
}