const UserDAO = require('../integration/UserDAO.js')
const { connectToDB, getDatabase } = require('../integration/dbInit')

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
    beforeAll(async () => {
        await connectToDB() 
        process.env.NODE_ENV = "test"   //used to use an emtpy database with a similar structure to the "actual" database
        userDAO = new UserDAO()
    })

    beforeEach(async () => {
        await userDAO.person.destroy({ truncate: true, cascade: true })
    })

    afterAll(async () => {
        const db = getDatabase()
        await db.close()
        process.env.NODE_ENV = ""
    })

     test('should successfully connect to the database',async () => {
        console.log = jest.fn() // Capture console output
        await connectToDB()            
        await expect(console.log).toHaveBeenCalledWith("Connection has been established successfully.")
       
    })

    test('should successfully create user with an username and password', async () => {
        const user = await userDAO.createUser({username:"banana", password:"hejhej"})

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
        console.log = jest.fn() // Capture console output
        const user = await userDAO.createUser(person1)
        const loggedInUser = await userDAO.loginUser(person1.username, person1.password)

        await expect(console.log).toHaveBeenCalledWith("Log in success")
        await expect(loggedInUser).not.toBeNull()
        await expect(loggedInUser.person_id).toBe(user.person_id)
        await expect(loggedInUser.username).toBe(user.username)
        await expect(loggedInUser.password).toBe(user.password)
    })

    test('should fail to login a user, with wrong username', async() => {
        console.log = jest.fn() // Capture console output
        await userDAO.createUser(person2)
        const loggedInUser = await userDAO.loginUser(person1.username, person1.password)

        await expect(console.log).toHaveBeenCalledWith("No user found with that username")
        await expect(loggedInUser).toBeNull()
    })

    test('should fail to login a user, with wrong password', async() => {
        console.log = jest.fn() // Capture console output
        await userDAO.createUser(person1)
        const loggedInUser = await userDAO.loginUser(person1.username, "wrongPassword")


        await expect(console.log).toHaveBeenCalledWith("Incorrect password")
        await expect(loggedInUser).toBeNull()

    })
    
})
