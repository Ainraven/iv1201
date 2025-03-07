require('dotenv').config({path: `${process.cwd()}/../.env`})
const { initModels } = require('../model/init-models')
const cls = require('cls-hooked')
const bcrypt = require('bcrypt')

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
             const person = await this.person.findOne({
                where: {username:username}
             })
             console.log(person)
             return person;
            }
            catch(err){
                console.log("failed to find person", err)
        }
    }

    /**
    * Method used to find a user in the person table based on their email.
    * 
    * @param {string} email: is the email used when logging in 
    * @returns a json with the selected row in the person table
    */
    async findPersonByEmail(email){
        try{
             const person = await this.person.findAll({
                where: {email:email}
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

    /**
     * Method to compare given password with hashed password in database
     * 
     * @param {*} user is a user derived from the database which has the hashed password
     * @param {*} password is the "actuall" plaintext password used to compare with the hashed one
     * @returns a boolean that returns true if both passwords correspond to each other, otherwise false.
     */
    async checkPassword(user, password) {
        if (!user || !user.password) return false
        const passwordIsHashedPassword = await bcrypt.compare(password, user.password)
        return passwordIsHashedPassword
        }

    /**
     * A method that is used to find a user based on a username and password, i.e logging the user in.
     * If no user is found, then that user does not exist in the database and need to create an account.
     * 
     * @param {String} userUsername: is the username which the user is trying to log in with 
     * @param {String} userPassword: is the password which the user is trying to log in with
     * @returns a JSON with the found person. Returns null otherwise
     */
    async loginUser(userUsername, userPassword){
        try{
            await this.encryptExistingPasswords()
            const person = await this.findPersonByUsername(userUsername)
            console.log(person)
            
            //person will be an null if no user is found
            if(!person){
                console.log("No user found with that username")
                return null
            }

            const isValidPassword = await this.checkPassword(person, userPassword)
            console.log(person.password)
            console.log(userPassword)
            console.log(isValidPassword)

            if(isValidPassword){
                console.log("Log in success")
                return person
            }
            else {
                console.log("Incorrect password")
                return null
            }
        
        }
        catch(error){
            console.debug("loginUser Failed" + error)
        }
    }




async encryptExistingPasswords() {
    const usersToUpdate = [
        { person_id: 1, password: 'LiZ98qvL8Lw' },
        { person_id: 2, password: 'QkK48drV2Da' },
        { person_id: 3, password: 'EyD84euX5Nj' },
        { person_id: 4, password: 'VdE34mqY2Xy' },
        { person_id: 5, password: 'NmK87boS4Lf' },
        { person_id: 6, password: 'LqK20ygU3Lw' },
        { person_id: 7, password: 'OjP41mkY3Vb' },
        { person_id: 8, password: 'LbH38urF4Kn' },
        { person_id: 9, password: 'XoH15hnY3Bw' },
        { person_id: 10, password: 'MvZ46kfC1Kr' }
    ]
    try {
        for (let user of usersToUpdate) {
            const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
            await this.person.update(
                { password: hashedPassword },  // Update with hashed password
                { where: { person_id: user.person_id } } // Target specific user
            );

            console.log(`Updated password for person_id: ${user.person_id}`);
        }

        console.log('Password update complete.');
    } catch (error) {
        console.error('Error updating passwords:', error);
    }
  }

}


module.exports = UserDAO
