const databaseConfigPath = './config/database.js'
const database = require(databaseConfigPath)
const {initModels} = require('../model/init-models')


/**
 * Method used to initialize models, create relevant tables for the app and confirm that a connection has been established
*/ 
async function connectToDB(){
    try {
        await createTables()
        await database.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}
/**
 * Create tables for the program. Syncs the database with the model and updates lookup tables that are required 
 * before one can interact with the database.
 */
async function createTables(){
    try{
        await syncModels()
        await insertRoleValues()
        await insertApplicationStatusValues()
    } catch(error){
        console.log("Could not create tables " + error)
    }
}
/**
 * Initializes and syncs the models with the database. 
 * Manually loops through all of models in the order of the list due to foreign key constraints
 * Important order is role -> person and application_status -> application
 */
async function syncModels(){
    const models = initModels(database)
    const modelList = ["role",
        "person", 
        "competence" , 
        "competence_profile", 
        "availability", 
        "application_status", 
        "application"]

    //Iterates the list of models from initModels and syncs with database
    for (const modelName of modelList) {
        const model = models[modelName]

        if(!model){
            console.log("Model " + modelName + "does not exist")
        }

        //drop table before syncing if not in production environment, otherwise alter db to match models
        try{
            const syncOptions = process.env.NODE_ENV === 'production' ? { alter: true } : { force: true }
            await model.sync(syncOptions)
        } catch(error){
            console.log("Cannot sync model " + modelName  +": " + error)
        }
    }
}

/**
 * Used to insert application status messages into the application status table if they arent present. 
 * This does not exist in the existing-database.sql file and therefore we need to manually at them 
 */
async function insertApplicationStatusValues(){
    const statuses = ['PENDING', 'ACCEPTED', 'REJECTED']
    for (const status of statuses) {
        await database.models.application_status.findOrCreate({ 
            where: { name: status } 
        })
    }
    console.log("Application status is initialized")
}

/**
 * Is used to insert values into the role table if they aren't present. 
 * Is primarily used for testing purposes because the role table is mandatory when creating users. 
 * Is not necessarily needed if one runs the existing-database.sql file. 
 */
async function insertRoleValues(){
    const roles = ['recruiter', 'applicant']
    for (const role of roles) {
        await database.models.role.findOrCreate({ 
        where: { name: role } 
        })
    }
    console.log("Roles are initialized")
} 

/**
 * @returns the database which is used for transactions. This way the controller wont have
 * to directly interact with the database object through the constructor. Also used to return the database object to the DAOs
 */
function getDatabase(){
    return database
}
module.exports = {connectToDB, getDatabase}