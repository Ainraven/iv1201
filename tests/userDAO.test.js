const UserDAO = require('../integration/UserDAO.js'); 
require('dotenv').config({path: `${process.cwd()}../.env`});


describe('UserDAO Database Integration Tests', () => {
    let userDAO;

    beforeEach(async () => {
        userDAO = new UserDAO();
    });

     test('should successfully connect to the database',  () => {
        console.log = jest.fn(); // Capture console output
        userDAO.connectToDB().then(
            expect(console.log).toHaveBeenCalledWith('Connection has been established successfully.'));
    }); 
});
