const UserDAO = require('../integration/UserDAO.js'); 

const person1 = {username:"abcdef", 
                password:"fedcba", 
                firstname:"John" , 
                lastname:"Doe" , 
                personalNumber : "00000420-1337", 
                email : "john@finnsinte.se", 
                role:2}


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
        await userDAO.createUser({firstname:"banana"})
        const user = await userDAO.findUserById(1);

        expect(user).not.toBeNull();
        expect(user[0].person_id).toBe(1)
    })

    test('should successfully create and find user with a person object', async () => {
        //await userDAO.createUser(person1)
        await userDAO.createUser(person1);
        console.debug(person1)

        const user = await userDAO.findUserById(1);
        console.debug(user)

        expect(user).not.toBeNull();
        expect(user[0].person_id).toBe(1)
    })
});
