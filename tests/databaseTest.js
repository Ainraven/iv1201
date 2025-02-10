
const UserDAO = require('../integration/UserDAO.js'); 

const userDAO = new UserDAO();
const database = userDAO.database;

//prints the selected row with username as param
async function findPersonBasedOnUserName(){
const username = "JoelleWilkinson";
const person = await userDAO.findPersonByUsername(username);  
console.log(username + ":" , JSON.stringify(person));
}

async function transactionTest(){
    return await database.transaction(async (t1) =>  
        {const username = "JoelleWilkinson";
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

    userDAO.connectToDB().then(async () => {
        await findAllPersonsTest();
        await findPersonBasedOnUserName();
        await findPersonBasedOnID();
        await transactionTest();  
    });




