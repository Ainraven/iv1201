/**
 * Finds user by their userID 
 * @returns json of a found user
 */
async function getUserById() {    
    const userID = document.getElementById("userID").value
    if(!userID) {
        alert("Please, enter User ID")
        return
    }

    try {

        if(userID == 1337) {
            console.log("hi")
            throw new Error()
        }

        const res = await fetch(`/api/users/${userID}`)
        const data = await res.json()
        if(!res.ok) {
            alert(data.message)
            throw new Error(`API error:`, res.status)
        }

        printUser(data)
    }
    catch (error) {
        alert("500: Server fetch error")
        console.error(`Server fetch error:`, error)
    }
}
 
/**
 * Prints user information
 * @param {*} data user
 */
async function printUser(data) {
    const user = Array.isArray(data) ? data[0] : data;

    document.getElementById("output").innerText = 
        `name: ${data[0].name} \n
        surname: ${data[0].surname}`
}

/**
 * Fetches all users from the database
 */
async function getAllUsers() {
    try{
        const res = await fetch(`api/users`)
        if(!res.ok) {
            alert("500: Server error getting users")
            throw new Error(`API error`, res.status)
        }
        const data = await res.json()
    }
    catch (error) {
        alert("500: Server fetch error")
        console.error(`Error in showAllUsers(): `, error)
    }
}