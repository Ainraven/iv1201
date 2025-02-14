
require('dotenv').config({path: `${process.cwd()}../.env`});

const UserDAO = require('../integration/UserDAO.js'); 

function createTestDB(){
    execSync(
        `PGPASSWORD=${process.env.DB_PASSWORD} psql -U ${process.env.DB_USERNAME} -h ${process.env.DB_HOST} -p ${process.env.DB_PORT} -c "CREATE DATABASE ${process.env.TEST_DB_NAME};"`,
        { stdio: "ignore"}
        
      )
}


describe('UserDAO Database Integration Tests', () => {
    let userDAO;
    beforeEach( async () => {
          userDAO = new UserDAO("test");
        //  return await new Promise((resolve) => setTimeout(resolve, 1000))
    });

    afterEach(async () => {
        await userDAO.getDatabase().close();
    })

     test('should successfully connect to the database',async () => {
        console.log = jest.fn(); // Capture console output
        await userDAO.connectToDB()            
        await expect(console.log).toHaveBeenCalledWith("Connection has been established successfully.")
       
    }); 
});
