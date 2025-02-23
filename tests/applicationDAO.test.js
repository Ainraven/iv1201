


const UserDAO = require('../integration/UserDAO.js'); 
const ApplicationDAO = require('../integration/ApplicationDAO.js')

describe('Application Database Integration Tests', () => {
    let applicationDAO;

    beforeAll( () => {
        applicationDAO = new ApplicationDAO("test")
        applicationDAO.connectToDB();
    });

    beforeEach(async () => {
        await applicationDAO.person.destroy({ truncate: true, cascade: true });
    })

    afterAll(async () => {
        await applicationDAO.getDatabase().close();
    })

     test('should create an application',async () => {
        const app = await applic.manageApplication(11, true)
        expect(app).toBe(applic.getDatabase().models.application[0])
       
    }); 
});