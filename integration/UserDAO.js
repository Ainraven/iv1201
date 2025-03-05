require('dotenv').config({path: `${process.cwd()}/../.env`})
const { initModels } = require('../model/init-models')
const cls = require('cls-hooked')

const databaseConfigPath = './config/database.js'
const Sequelize = require ('sequelize')

/* 
Class containing constructor for the DAO and its related methods pertaining to users. It is responsible for calls to the database.
*/
class UserDAO {

/** 
 * Initializes the database based on the configurered sequelize instance from database.js
 */
    constructor() {
        const name = cls.createNamespace('iv1201-db')
        Sequelize.useCLS(name)

        this.database = require(databaseConfigPath)
        const models = initModels(this.database)
        this.person = models.person
    }

    /*
    Method used to confirm that a connection has been established
    */ 
    async connectToDB(){
        try {
            await this.database.authenticate()
            console.log('Connection has been established successfully.')
            await this.database.models.role.sync()
            await this.database.models.person.sync()
            await this.database.models.competence.sync()
            await this.database.models.competence_profile.sync()
            await this.database.models.availability.sync()
            await this.database.models.application.sync()
        
        } catch (error) {
            console.error('Unable to connect to the database:', error)
        }
    }

    /**
     * 
     * @returns the database which is used for transactions. This way the controller wont have
     * to directly interact with the database object through the constructor.
     */
    getDatabase(){
        return this.database
    }

   /**
    * Method used to find a user in the person table based on their username.
    * 
    * @param {string} username: is the username used when logging in 
    * @returns a JSON with the selected row in the person table
    */
    async findPersonByUsername(username){
        try{
             const person = await this.person.findAll({
                where: {username:username}
             })
             return person
            }
            catch(err){
                console.log("failed to find person", err)
            }
    }
    
    /**
     * Method used to find all people in the person table.
     * 
     * @returns a JSON of the whole person table
     */
    async findAllPersons(){
        try {
            console.log("findAllPersons here")
            const people = await this.person.findAll({limit:10}) //limit to 10 for now
            return people
            
        } catch (error) {
            console.log("womp womp")
        }
    }

    /**
     * Method used to find a user in the person table based on their ID.
     * 
     * @param {number} ID: is used to match with the person_id in the person table 
     * @returns a JSON with the selected row in the person table
     */
    async findUserById(ID){
        try{
            const person = await this.person.findAll({
                where:{person_id:ID}
            })
            if (person.length === 0) { //If there is no matching person, it will return an empty array.
                    console.log(`Couldn't find user with ID ${ID}`) 
            }
            return person
        }
        catch(error){
            console.log("Error in findUserByID: ", error)
        }
    }

    /** 
     * Method used to create a person in the person table.
     * 
     * @param {object} user: used to create  a user with different parameters 
     * @returns a JSON with a person
     */
    async createUser(user){
        try{    
            const person = await this.person.create({
                username : user.username,
                password : user.password,
                name : user.firstname,
                surname : user.lastname,
                pnr : user.personalNumber,
                email : user.email,
                role_id : user.role
                })
            return person
        }catch(error){
            console.debug("Couldn't create user" + error)
        }
    }

    /**
     * Method used to delete a row from the person table. 
     * 
     * @param {int} id: the person ID that will be used to match with a person_id in the system 
     */
    async deleteUser(id){
        try{
            await this.person.destroy({
                where: {person_id : id}
            })
        }catch(error){
            console.log("Could not delete user" + error)
        }
    }

}


module.exports = UserDAO
