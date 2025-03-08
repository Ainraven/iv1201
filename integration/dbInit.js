const databaseConfigPath = './config/database.js'
const database = require(databaseConfigPath)

/**
Method used to confirm that a connection has been established and create tables.
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
        await database.model.role.sync().then(insertRoleValues)
        await database.model.person.sync()
        await database.model.competence.sync()
        await database.model.competence_profile.sync()
        await database.model.availability.sync()
        await database.model.application_status.sync().then(insertApplicationStatusValues)
        await database.model.application.sync()
    } catch(error){
        console.log("Could not create tables " + error)
    }
}

/**
 * Used to insert application status messages into the application status table if they arent present. 
 * This does not exist in the existing-database.sql file and therefore we need to manually at them 
 */
async function insertApplicationStatusValues(){
    const statuses = ['PENDING', 'ACCEPTED', 'REJECTED']
    for (const status of statuses) {
      await database.model.application_status.findOrCreate({ 
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
        await database.model.role.findOrCreate({ 
        where: { name: role } 
        })
    }
    console.log("Roles are initialized")
} 

/**
 * @returns the database which is used for transactions. This way the controller wont have
 * to directly interact with the database object through the constructor.
 */
function getDatabase(){
    return database
}
module.exports = {connectToDB, getDatabase}