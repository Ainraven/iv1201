// const userService = require('../service/userService')
const UserDAO = require('../integration/UserDAO')
const ApplicationDAO = require('../integration/ApplicationDAO')
const express = require('express')

class Controller {
    
    constructor() {
        this.router = express.Router()
        this.userDAO = new UserDAO()
        this.applicationDAO = new ApplicationDAO()
        this.getUserByID = this.getUserByID.bind(this)
        this.getAllUsers = this.getAllUsers.bind(this)
        this.getAllApplications = this.getAllApplications.bind(this)
        this.acceptApplication = this.acceptApplication.bind(this)
        this.login = this.login.bind(this)
        this.router.get('/users/:id', this.getUserByID)
        this.router.get('/users', this.getAllUsers)
        this.router.get('/applications', this.getAllApplications)
        this.router.get(`/applications/:id`, this.acceptApplication)
        this.router.get(`/auth/login`, this.login)
    }

    async getUserByID(req, res) {
        try {
            // const user = await userService.getUserById(req.param.id)
            const user = await this.userDAO.findUserById(req.params.id)
            if(!user) return res.status(404).json({message: "User not found"})
            res.json(user)
        }
        catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userDAO.findAllPersons()
            if(!users) return res.status(404).json({message: "Users not found"})
            res.json(users)
        }
        catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async getAllApplications(req, res) {
        try {
            const applications = await this.applicationDAO.showAllApplications()
            if(!applications) return res.status(404).json({message: "Applications not found"})
            res.json(applications)
        }
        catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async acceptApplication(req, res) {
        try {
            // console.log("THIS IS REQUEST: ", req)

            const accepted = await this.applicationDAO.handleApplicationByPersonId(req.params.id, true)
            if(!accepted) return res.status(404).json({message: "Applications not found"})
            res.json(accepted)
        }
        catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async login(req, res) {
        try {
            const {loginHandle, password} = req.body
        
        // const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // const isValidEmail = pattern.test(loginHandle)

            const user = await this.userDAO.loginUser(loginHandle, password)

            if(!user) {
                return res.status(404).json({message: "User not found"})
            }

            console.log(user)
            res.json(user)
        }
        catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    getRouter() {
        return this.router
    }
}

module.exports = Controller