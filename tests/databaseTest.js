
const UserDAO = require('../integration/UserDAO.js'); 
const ApplicationDAO = require('../integration/ApplicationDAO.js'); 

const applicationDAO = new ApplicationDAO();
const userDAO = new UserDAO();

const database = userDAO.getDatabase();

/**
 * Used to test method findPersonByUserName
 */
async function findPersonBasedOnUserName(){
    const username = "JoelleWilkinson";
    const person = await userDAO.findPersonByUsername(username);  
    console.log(username + ":" , JSON.stringify(person));
}

async function transactionTest(){
    return await database.transaction(async (t1) =>  { 
        const username = "JoelleWilkinson";
        const person = await userDAO.findPersonByUsername(username);  
        console.log(username + ":" , JSON.stringify(person));
        });
}

//prints the first 10 people in the person table, change limit in /UserDAO.js
 async function  findAllPersonsTest(){
    const people = await userDAO.findAllPersons()
    console.log('All users:', JSON.stringify(people, null, 2));
}

async function findPersonBasedOnID(){
    const ID = 1;
    const person = await userDAO.findUserById(ID);
    console.log("user with ID:" + ID + ":" , JSON.stringify(person))
}

async function createApplicationData(){
    await applicationDAO.createApplication(12,false)
}

async function deleteAllApplications(){
   await applicationDAO.deleteAllApplicationData();
}

async function viewAllApplications(){
   const applications = await applicationDAO.showAllApplications() 
   console.log('All applications:', JSON.stringify(applications, null, 2));
}

    userDAO.connectToDB().then(async () => {
        await findAllPersonsTest()
        await findPersonBasedOnUserName()
        await findPersonBasedOnID()
        await transactionTest()
       // await deleteAllApplications();
        await viewAllApplications()
        await applicationDAO.createUnhandledApplicationsForExistingApplicants()
    });




