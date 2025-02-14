require('dotenv').config({path: `${process.cwd()}/../.env`});
const { initModels } = require('../models/init-models');
const cls = require('cls-hooked');

const databaseConfigPath = './config/database.js'
const Sequelize = require ('sequelize');

/* 
Class containing constructor for the DAO and its related methods. It is responsible for calls to the database.
*/
class UserDAO {

/*
Initializes the database based on the configurered sequelize instance from database.js
*/

    constructor(env) {
        const name = cls.createNamespace('iv1201-db');
        Sequelize.useCLS(name);

        process.env.NODE_ENV = env || "development";
        this.database = require(databaseConfigPath)
        const models = initModels(this.database);
        this.person = models.person;
    };

    /*
    method used to confirm that a connection has been established
    */ 
    async connectToDB(){
        try {
            await this.database.authenticate();
            console.log('Connection has been established successfully.');
           // await this.database.sync({alter:true, force:false});
            await this.database.models.role.sync();
            await this.database.models.person.sync();
            await this.database.models.competence.sync();
            await this.database.models.competence_profile.sync();
            await this.database.models.availability.sync();
        
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    /**
     * 
     * @returns the database which is used for transactions. This way the controller wont have
     * to directly interact with the database object through the constructor.
     */
    getDatabase(){
        return this.database;
    }

   /**
    * Method used to find a user in the person table based on their username.
    * 
    * @param {string} username: is the username used when logging in 
    * @returns a json with the selected row in the person table
    */
    async findPersonByUsername(username){
        try{
             const person = await this.Person.findAll({
                where: {username:username}
             })
             //console.log(username + ":" , JSON.stringify(person))
             return person;
            }
            catch(err){
                console.log("failed to find person", err)
            }
    }
    
    /**
     * Method used to find all people in the person table.
     * 
     * @returns a json of the whole person table
     */
    async findAllPersons(){
        try {
            const people = await this.Person.findAll({limit:10}) //limit to 10 for now
          //console.log('All users:', JSON.stringify(people, null, 2));
            return people;
            
        } catch (error) {
            console.log("womp womp")
        }
    }

    /**
     * Method used to find a user in the person table based on their ID.
     * 
     * @param {number} ID: is used to match with the person_id in the person table 
     * @returns a json with the selected row in the person table
     */
    async findUserById(ID){
        try{
            const person = await this.Person.findAll({
                where:{person_id:ID}
            })
            if (person.length === 0) { //If there is no matching person, it will return an empty array.
                    console.log(`Couldn't find user with ID ${ID}`); 
            }
            return person;
        }
        catch(error){
            console.log("Couldn't find user with ID" + ID)
        }
    }
}

module.exports = UserDAO;
