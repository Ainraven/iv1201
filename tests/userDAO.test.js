const UserDAO = require('../integration/UserDAO.js')

const person1 = {username:"abcdef", 
                password:"fedcba", 
                firstname:"John" , 
                lastname:"Doe" , 
                personalNumber : "00000420-1337", 
                email : "john@finnsinte.se", 
                role:2}

const person2 = {username:"JoeMama", 
                password:"skrtskrt", 
                firstname:"Joe" , 
                lastname:"Mama" , 
                personalNumber : "00000420-6969", 
                email : "joe@finnsinte.se", 
                role:2}


describe('UserDAO Database Integration Tests', () => {
    let userDAO
    beforeAll( () => {
        process.env.NODE_ENV = "test"   //used to use an emtpy database with a similar structure to the "actual" database
        userDAO = new UserDAO()
    })

    beforeEach(async () => {
        await userDAO.person.destroy({ truncate: true, cascade: true })
    })

    afterAll(async () => {
        const db = userDAO.getDatabase()
        await db.close()
        process.env.NODE_ENV = ""
    })

     test('should successfully connect to the database',async () => {
        console.log = jest.fn() // Capture console output
        await userDAO.connectToDB()            
        await expect(console.log).toHaveBeenCalledWith("Connection has been established successfully.")
       
    })

    test('should successfully create user with name', async () => {
        const user = await userDAO.createUser({username:"banana"})

        await expect(user).not.toBeNull()
        await expect(user.username).toBe("banana")
    })

    test('should successfully create user with a person object', async () => {
        const user = await userDAO.createUser(person1)

        await expect(user).not.toBeNull()
        await expect(user.name).toBe(person1.firstname)
    })

    test('should delete a user from the database', async() => {
        const user = await userDAO.createUser(person1)
        await userDAO.deleteUser(user.person_id)

        const deleted = await userDAO.findUserById(user.person_id)
        await expect(deleted).toHaveLength(0)
    })

    test('should login a user from the database', async() => {
        const user = await userDAO.createUser(person1)
        const loggedInUser = await userDAO.loginUser(person1.username, person1.password)

        await expect(loggedInUser).not.toBeNull()
        await expect(loggedInUser[0].person_id).toBe(user.person_id)
        await expect(loggedInUser[0].username).toBe(user.username)
        await expect(loggedInUser[0].password).toBe(user.password)
    })

    test('should fail to login a user, as user is not in database', async() => {
        console.log = jest.fn() // Capture console output
        const user = await userDAO.createUser(person2)
        const loggedInUser = await userDAO.loginUser(person1.username, person1.password)

        await expect(console.log).toHaveBeenCalledWith("There is no user with that password or username")
        await expect(loggedInUser).toStrictEqual([])
        await expect(loggedInUser.person_id).not.toBe(user.person_id)
        await expect(loggedInUser.username).not.toBe(user.username)
        await expect(loggedInUser.password).not.toBe(user.password)
    })
    
})
