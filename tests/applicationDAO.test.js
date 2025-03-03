const UserDAO = require('../integration/UserDAO.js')
const ApplicationDAO = require('../integration/ApplicationDAO.js')

const person1 = {
    username:"abcdef", 
    password:"fedcba", 
    firstname:"John" , 
    lastname:"Doe" , 
    personalNumber : "00000420-1337", 
    email : "john@finnsinte.se", 
    role:2}

const person2 = {
    username:"JoeMama", 
    password:"skrtskrt", 
    firstname:"Joe" , 
    lastname:"Mama" , 
    personalNumber : "00000420-6969", 
    email : "joe@finnsinte.se", 
    role:2}

describe('Application Database Integration Tests', () => {
    let applicationDAO
    let userDAO


    beforeAll( () => {
        process.env.NODE_ENV = "test"
        userDAO = new UserDAO()
        applicationDAO = new ApplicationDAO()
    })

    beforeEach(async () => {
        await applicationDAO.person.destroy({truncate: true, cascade: true})
        await applicationDAO.application.destroy({truncate: true, cascade: true})

    })

    afterAll(async() => {
        db = applicationDAO.getDatabase()
        await db.close()
        process.env.NODE_ENV = ""
    })

     test('should create an application',async () => {
        const user1 = await userDAO.createUser(person1)
        const user2 = await userDAO.createUser(person2)

        const app1 = await applicationDAO.createApplication(user1.person_id)
        const app2 = await applicationDAO.createApplication(user2.person_id)
        
        await expect(app1).not.toBeNull()
        await expect(app1.person_id).toBe(user1.person_id)
        await expect(app2).not.toBeNull()
        await expect(app2.person_id).toBe(user2.person_id)
    })

    test('should find an existing epplication', async() =>{
        const user = await userDAO.createUser(person1)
        const app = await applicationDAO.createApplication(user.person_id)
        const foundApp = await applicationDAO.findApplicationByApplicationId(app.application_id)

        await expect(foundApp).not.toBeNull()
        await expect(app.application_id).toEqual(foundApp[0].application_id)
        await expect(app.person_id).toEqual(foundApp[0].person_id)
        await expect(app.application_status).toEqual(foundApp[0].application_status)
    })

    test('should alter an existing application', async ()=>{
        const user = await userDAO.createUser(person1)
        const appBeforeChange = await applicationDAO.createApplication(user.person_id)
        
        await expect(appBeforeChange).not.toBeNull()
        await expect(appBeforeChange.application_status).toBe(null)

        const app = await applicationDAO.handleApplicationByPersonId(user.person_id, true)
        await expect(app[0].application_status).not.toBe(appBeforeChange.application_status)
        await expect(app[0].application_status).toEqual(true)
    })

    test('should delete an application from database', async() => {
        const user = await userDAO.createUser(person1)
        const app = await applicationDAO.createApplication(user.person_id)
        await applicationDAO.deleteApplicationByApplicationId(app.application_id)
        
        const deleted = await applicationDAO.findApplicationByApplicationId(app.application_id)
        await expect(deleted).toHaveLength(0)
    })
})