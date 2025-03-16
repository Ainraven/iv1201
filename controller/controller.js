const express = require('express')
const jwt = require('jsonwebtoken')
const UserDAO = require('../integration/UserDAO')
const ApplicationDAO = require('../integration/ApplicationDAO')
const authenticateToken = require('../middleware/authorisationMiddle')
const { getDatabase } = require('../integration/dbInit')


/**
 * Handles calls between frontend and backend
 */
class Controller {
    
    constructor() {
        // Bind functions to this object
        this.router = express.Router()
        this.userDAO = new UserDAO()
        this.applicationDAO = new ApplicationDAO()
        this.getUserByID = this.getUserByID.bind(this)
        this.getAllUsers = this.getAllUsers.bind(this)
        this.getUserByUsername = this.getUserByUsername.bind(this)
        this.getApplicationByUserID = this.getApplicationByUserID.bind(this)
        this.getApplications = this.getApplications.bind(this)
        this.acceptApplication = this.acceptApplication.bind(this)
        this.rejectApplication = this.rejectApplication.bind(this)
        this.pendingApplication = this.pendingApplication.bind(this)
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)

        // Map fuinctions to API endpoints, always starts with /api/... for the sake of other files
        this.router.get('/users/:id', this.getUserByID)
        this.router.get('/users/username/:id', this.getUserByUsername)
        this.router.get('/users', this.getAllUsers)
        this.router.get('/applications/:id', this.getApplicationByUserID)
        this.router.get('/applications', authenticateToken, this.getApplications)
        this.router.get(`/applications/accept/:id`, this.acceptApplication)
        this.router.get(`/applications/reject/:id`, this.rejectApplication)
        this.router.get(`/applications/pending/:id`, this.pendingApplication)

        //Used for transactions. Transaction object is automatically passed to each query through cls, but eg t1 is still needed as a parameter
        //Transactions are used for methods that manipulate the database, or require multiple calls.
        this.database = getDatabase()
    }

    /**
     * Finds user by user ID and returns json of said user to api/users/:id
     * @param {*} req id
     * @param {*} res user
     */
    async getUserByID(req, res) {
        try {
            const user = await this.userDAO.findUserById(req.params.id)
            console.log(user)
            if(!user) {
                alert("User not found, wrong ID!")
                return res.status(404).json({message: "User not found"})
            } 
            res.json(user)
        }
        catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    /**
     * Finds user by a username and returns json of said user to api/users/username/:id
     * @param {*} req username
     * @param {*} res user
     */
    async getUserByUsername(req, res) {
        try {
            const user = await this.userDAO.findPersonByUsername(req.param.username)
            if (!user) return res.status(404).json({message: "User not found"})
            res.json(user)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    } 

    /**
     * Retrieves all users from the database and returns json to api/users
     * @param {*} req -
     * @param {*} res users
     */
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

    async getApplicationByUserID(req, res) {
        try {
            const application = await this.applicationDAO.findApplicationByUserId(req.params.id)
            if(!application) return res.status(404).json({message: "Application not found"})
            res.json(application)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    /**
     * Retrieves all applications from the database and put them as json on api/applications
     * It does so only if user is a recruiter (role_id = 1), otherwise access is denied
     * @param {*} req user
     * @param {*} res applications
     */
    async getApplications(req, res) {
        try {
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

    /**
     * Sets application status to "accepted"
     * @param {*} req application id
     * @param {*} res accepted application
     * @returns 
     */
    async acceptApplication(req, res) {
        return await this.database.transaction(async (t1) =>  { 
            try{
                const accepted = await this.applicationDAO.handleApplicationById(req.params.id, 2)
                if(!accepted) return res.status(404).json({message: "Applications not found"})
                res.json(accepted)
            }
            catch (error) {
                res.status(500).json({message: error.message})
            }
        })
    }
    /**
     * Sets application status to "rejected"
     * @param {*} req application id
     * @param {*} res rejected application
     * @returns 
     */
    async rejectApplication(req, res) {
        return await this.database.transaction(async (t1) =>  { 
            try{
                const rejected = await this.applicationDAO.handleApplicationById(req.params.id, 3)
                if(!rejected) return res.status(404).json({message: "Applications not found"})
                res.json(rejected)
            }
            catch (error) {
                res.status(500).json({message: error.message})
            }
        })
    }
    /**
     * Sets application status to "pending"
     * @param {*} req application id
     * @param {*} res updated application 
     * @returns 
     */
    async pendingApplication(req, res) {
        return await this.database.transaction(async (t1) =>  { 
            try{
                const pending = await this.applicationDAO.handleApplicationById(req.params.id, 1)
                if(!pending) return res.status(404).json({message: "Applications not found"})
                res.json(pending)
            }
            catch (error) {
                res.status(500).json({message: error.message})
            }
        })
    }

    /**
     * Logs in person by verifying username and password, creates an authorisation token
     * @param {*} req login handle and password
     * @param {*} res authorisation token
     */
    async login(req, res) {
        return await this.database.transaction(async (t1) =>  { 
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
        })
    }

    /**
     * Creates a new user
     * @param {*} req first name, last name, personal number, username, password
     * @param {*} res user
     */
    async signup(req, res) {
        return await this.database.transaction(async (t1) =>  { 
            try {
                const {firstname, lastname, personalNumber, username, password} = req.body

                const userIsRegistered = await this.userDAO.findPersonByUsername(username)
                var newUser = null

                if (!userIsRegistered) {
                   newUser = await this.userDAO.createUser({
                        username: username,
                        password: password,
                        firstname: firstname,
                        lastname: lastname,
                        personalNumber: personalNumber,
                        email: null,
                        role: 2
                    })
                    if (!newUser) {
                        return res.status(500).json({message: "Unable to create new user"})
                    }
                }

                return res.json(newUser)

            } catch (error) {
                res.status(500).json({message: error.message})
            }
        })
    }

    /**
     * Controller router endpoints
     * @returns router
     */
    getRouter() {
        return this.router
    }
}

module.exports = Controller
