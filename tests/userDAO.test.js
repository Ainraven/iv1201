
require('dotenv').config({path: `${process.cwd()}../.env`});

const UserDAO = require('../integration/UserDAO.js'); 

function createTestDB(){
    execSync(
        `PGPASSWORD=${process.env.DB_PASSWORD} psql -U ${process.env.DB_USERNAME} -h ${process.env.DB_HOST} -p ${process.env.DB_PORT} -c "CREATE DATABASE ${process.env.TEST_DB_NAME};"`,
        { stdio: "ignore"}
        
      )
}

const person1 = {id:1, username:"abcdef", password:"fedcba", firstname:"John" , lastname:"Doe" , personalNumber : "00000420-1337", email : "john@finnsinte.se", role:2}


describe('UserDAO Database Integration Tests', () => {
    let userDAO;
    beforeAll( () => {
        userDAO = new  UserDAO("test")
    });

    beforeEach(async () => {
        await userDAO.person.destroy({ truncate: true, cascade: true });
    })

    afterAll(async () => {
        await userDAO.getDatabase().close();
    })

     test('should successfully connect to the database',async () => {
        console.log = jest.fn(); // Capture console output
        await userDAO.connectToDB()            
        await expect(console.log).toHaveBeenCalledWith("Connection has been established successfully.")
       
    }); 

    test('should successfully create and find user with id', async () => {
        //await userDAO.createUser(person1)
        await userDAO.createUser({id:2})
        await userDAO.createUser({id:1})
        const user = await userDAO.findUserById(1);

        expect(user).not.toBeNull();
        console.debug(user[0].person_id)
        expect(user[0].person_id).toBe(1)
     
    })
});
