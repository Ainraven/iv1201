require('dotenv').config({path: `${process.cwd()}/../.env`});
const { initModels } = require('../model/init-models')

const databaseConfigPath = './config/database.js'
const Sequelize = require ('sequelize')

class UserDAO {
    constructor() {
        // const name = cls.createNamespace('app-db');
        // Sequelize.useCLS(name);
        this.database = require (databaseConfigPath)
        const models = initModels(this.database);
         this.Person = models.person;
    
    };

     async connectToDB(){
    try {
        await this.database.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }

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
            console.log("Error in findUserByID: ", error)
        }
    }
}

module.exports = UserDAO;
