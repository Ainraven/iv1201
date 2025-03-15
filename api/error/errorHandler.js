const express = require("express")
/**
 * This class handles any types of errors and reroutes to the 
 * propper window for the error.
 */
class ErrorHandler {
    /**
     * This static function handles all types of errors.
     * @param {*} err: error object
     * @param {*} req: request object
     * @param {*} res: response object
     * @param {*} next: next function object
     */
    static errorHandler(err, req, res, next) {
        console.log("Error caught: ", err.message)

        const code = err.status || 500
        const message = err.message || "Internal server error"
        
        res.status(code).json({error: message, status: code})
    }
}

module.exports = ErrorHandler