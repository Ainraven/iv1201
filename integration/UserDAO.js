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

    constructor() {
        const name = cls.createNamespace('iv1201-db');
        Sequelize.useCLS(name);
        
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
    Querries the database where @param username 
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
    //limit to 10 for now
    async findAllPersons(){
        try {
            const people = await this.Person.findAll({limit:10})
          //console.log('All users:', JSON.stringify(people, null, 2));
            return people;
            
        } catch (error) {
            console("womp womp")
        }
    }

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
