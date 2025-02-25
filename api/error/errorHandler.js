const express = require("express")
/**
 * 
 */
class ErrorHandler {
    /**
     * 
     * @param {*} err 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    static errorsToHandle(err, req, res, next) {
        if (err.statusCode) {
            return err.status(err.statusCode).json({
                status: err.status,
                message: err.message,
                statusCode: err.statusCode,
            })
        }
        // if we have an unknown error we want to handle that as a server error
        return res.status(500).json({
            status: "unknown error",
            message: "server is not working!",
        })
    }
}

module.exports = ErrorHandler