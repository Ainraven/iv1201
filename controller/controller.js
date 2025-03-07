// const userService = require('../service/userService')
const UserDAO = require('../integration/UserDAO')
const ApplicationDAO = require('../integration/ApplicationDAO')
const express = require('express')
const jwt = require('jsonwebtoken')
const authenticateToken = require('../middleware/authorisationMiddle')

class Controller {
    
    constructor() {
        this.router = express.Router()
        this.userDAO = new UserDAO()
        this.applicationDAO = new ApplicationDAO()
        this.getUserByID = this.getUserByID.bind(this)
        this.getAllUsers = this.getAllUsers.bind(this)
        //this.getUserByUsername = this.getUserByUsername.bind(this)
        this.getApplications = this.getApplications.bind(this)
        this.acceptApplication = this.acceptApplication.bind(this)
        this.rejectApplication = this.rejectApplication.bind(this)
        this.pendingApplication = this.pendingApplication.bind(this)
        this.login = this.login.bind(this)
        this.createUser = this.createUser.bind(this)
        this.router.get('/users/:id', this.getUserByID)
        //this.router.get('/users/username/:id', this.getUserByUsername)
        this.router.get('/users', this.getAllUsers)
        this.router.get('/applications/api', authenticateToken, this.getApplications)
        this.router.get(`/applications/accept/:id`, this.acceptApplication)
        this.router.get(`/applications/reject/:id`, this.rejectApplication)
        this.router.get(`/applications/pending/:id`, this.pendingApplication)
        this.router.get(`/auth/login`, this.login)
        this.router.get(`/users/create-user`, this.createUser)
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

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
/*     async getUserByUsername(req, res) {
        try {
            const user = await this.userDAO.findPersonByUsername(req.param.username)
            if (!user) return res.status(404).json({message: "User not found"})
            res.json(user)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    } */

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

    async getApplications(req, res) {
        try {
            console.log("This is role: ", req.user.role)
            if (req.user.role !== 1) {
                return res.status(403).json({ message: "Access Denied" })
            }
            const applications = await this.applicationDAO.showAllApplications()
            if(!applications) return res.status(404).json({message: "Applications not found"})
            res.json(applications)
        }
        catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async acceptApplication(req, res) {
        try{
            const accepted = await this.applicationDAO.handleApplicationById(req.params.id, true)
            if(!accepted) return res.status(404).json({message: "Applications not found"})
            res.json(accepted)
        }
        catch (error) {
            res.status(500).json({message: error.message})
        }
    }
    async rejectApplication(req, res) {
        try{
            const rejected = await this.applicationDAO.handleApplicationById(req.params.id, false)
            if(!rejected) return res.status(404).json({message: "Applications not found"})
            res.json(rejected)
        }
        catch (error) {
            res.status(500).json({message: error.message})
        }
    }
    async pendingApplication(req, res) {
        try{
            const pending = await this.applicationDAO.handleApplicationById(req.params.id, null)
            if(!pending) return res.status(404).json({message: "Applications not found"})
            res.json(pending)
        }
        catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async login(req, res) {
        try {
            const {loginHandle, password} = req.body

            const user = await this.userDAO.loginUser(loginHandle, password)

            if(!user) {
                return res.status(404).json({message: "User not found"})
            }

            const token = jwt.sign(
                 {id: user.person_id, username: user.username, role: user.role_id},
                 process.env.JWT_SECRET,
                 {expiresIn: '1h'}
            )
            res.json({token})
        }
        catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async createUser(req, res) {
        try {
            const user = await this.userDAO.findPersonByUsername(req.params.username)

            if (!user) {
                const newUser = await this.userDAO.createUser(req.params)
                if (!newUser) {
                    return res.status(500).json({message: "Unable to create new user"})
                }
            }

            return res.json(user)

        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    getRouter() {
        return this.router
    }
}

module.exports = Controller