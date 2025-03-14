require('dotenv').config({path: `${process.cwd()}/../.env`})
const { getDatabase, models } = require('./dbInit')

/**  
Class containing constructor for the DAO and its related methods pertaining to users. It is responsible for calls to the database.
*/
class ApplicationDAO{

/** 
 * Initializes the database based on the configurered sequelize instance from database.js
 */
    constructor(){
        this.database = getDatabase()

        this.person = models.person
        this.application = models.application
    }

   /**
    * Method used to create an application in the application table.
    * 
    * @param {int} personID: is used to match the application with a person 
    * @param {bool} status: is used to determine the status of the application
    * TRUE:accepted, FALSE: rejected, NULL:unhandled
    * @returns a JSON with the application
    */
    async createApplication(personID, statusID){
        try{
            const application = await this.application.create({
                person_id : personID,
                application_status_id : statusID,
                })
            return application
        }catch(error){
            console.debug("Couldn't create application" + error)
        }
    }
    
    /**
     * Method used to update an existing application in the system, based on personID
     * 
     * @param {int} personID: used to match an application in the system with the given personID
     * @param {bool} status: used to update the status of the application that was matched with the ID
     * TRUE:accepted, FALSE: rejected, NULL:unhandled
     * @returns a JSON of the updated row in the application table. This is stored in the 1st index
     * which is why we return only that
     */
    async handleApplicationById(applicationID, statusID){
        try{
            const application = await this.application.update({application_status_id: statusID},
                {where: {application_id: applicationID},
                returning:true      //used to return the updated row
                }
            )
            return application[1]   
        }catch(error){console.debug("couldn't update application " + error)}
    }

    /**
     * Method used to delete an application based on application ID
     * 
     * @param {int} applicationID: used to specify which application to delete
     */
    async deleteApplicationByApplicationId(applicationID){
        try{ 
            await this.application.destroy({
            where: {application_id : applicationID}
        })
            
        }catch(error){console.debug("couldn't delete application " + error)}
    }

    /**
     * Method used to return the status of all applications, as well as 
     * the applicants' names 
     * 
     * @returns a JSON containing a list of all the applicants names, and their application status
     */
    async showAllApplications(){
        try{
            const people = await this.application.findAll( { 
                // limit:30,
                include: [{
                  model: this.person,
                  as:"person",
                  attributes: ['name', 'surname'] // Columns from the person table
                }],
                order: [
                    ['application_id', 'ASC']
                ]
            })
            return people;
        }catch(error){
            console.debug("couldn't show all applications " + error)
        }
    }

    /**
     * Method used to find an application based on application ID in the database.
     * 
     * @param {int} applicationID used to match with an existing application_id in the database
     * @returns a JSON with the selected row in the application table, 
     * containing person_id, application_id and application_status_id
     */
    async findApplicationByApplicationId(applicationID){
        try{
            const application = await this.application.findAll({
                where:{application_id :applicationID}})
            return application
        }catch(error){
            console.debug("findApplicationByApplicationId couldn't find application " + error)
        }
    }

    /**
     * Method used to find an application based on user ID in the database.
     * 
     * @param {int} userID used to match with an existing person_id in the database
     * @returns a JSON with the selected row in the application table, 
     * containing person_id, application_id and application_status_id
     */
        async findApplicationByUserId(userID){
            try{
                const application = await this.application.findAll({
                    where:{person_id: userID}})
                return application
            }catch(error){
                console.debug("findApplicationByUserID couldn't find application " + error)
            }
        }

    /**
     * A helper method used to give all persons in the person table with an applicant role 
     * an entry in the application table. 
     */
    async createUnhandledApplicationsForExistingApplicants(){
        try{
            const users = await this.person.findAll({
                where: { role_id: 2 }
              })

            for (const user of users) {
                await this.application.create({
                    person_id: user.person_id
                })
            }
        
        }catch(error){
            console.debug("Could not create application for all existing applicants" + error)
        }
    }
    /**
     * A helper method used to remove all data in the application table
     */
    async deleteAllApplicationData(){
        await this.application.destroy({truncate: true, cascade: true })
    }

    /** WIP 
     * 
     * Method used to show a full application based on the application ID
     * With the person ID in the application table one can derive the availability and competence.
     * 
     * @param {INT} applicationID 
     */
    async showDetailedApplication(applicationID){
        await this.application.findAll({include:this.person})
    }


}
module.exports = ApplicationDAO
