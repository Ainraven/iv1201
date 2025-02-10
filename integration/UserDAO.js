require('dotenv').config({path: `${process.cwd()}/../.env`});
const { initModels } = require('../models/init-models')

const databaseConfigPath = './config/database.js'
const Sequelize = require ('sequelize')

/* 
Class containing constructor for the DAO and its related methods. It is responsible for calls to the database.
CLS-hooked is used to enable easier use of transactions, but its not completely implemented in this iteration
*/

class UserDAO {
    constructor() {
        // const name = cls.createNamespace('iv1201-db');
        // Sequelize.useCLS(name);
        this.database = require (databaseConfigPath)
        const models = initModels(this.database);
         this.Person = models.person;
    
    };
    /*
    method used to confirm that a connection has been established
    */ 
     async connectToDB(){
    try {
        await this.database.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }

    /*
    Querries the database where @param username is used to check for username in the table. 
    Returns the whole row
    */ 

    async findPerson(username){
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
    //Used to all persons in the person table

    async findAllPersons(){
        try {
            const people = await this.Person.findAll({limit:10}) //limit to 10 for now, change with the limit parameter in find all
          //console.log('All users:', JSON.stringify(people, null, 2));
            return people;
            
        } catch (error) {
            console("womp womp")
        }
    }

    /**
     * 
     * @param ID is used to match with the person_id in person table 
     * @returns the whole row with said person
     */
    async findUserById(ID){
        try{
            const person = await this.Person.findAll({
                where:{person_id:ID}
            })
            return person;
        }
        catch(error){
            console.log("Couldn't find user with ID" + ID)
        }
    }
}

module.exports = UserDAO;
