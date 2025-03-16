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
        const res = await fetch(`/api/users/${userID}`)
        if(!res.ok) {
            alert("Server error fetching a user.")
            throw new Error(`API error:`, res.status)
        }
        const data = await res.json()
        if(!data[0]) {
            alert("User with this ID does not exist")
            throw new Error(`Input error:`, res.status)
        }
        printUser(data)
    }
    catch (error) {
        console.error(`Fetch error:`, error)
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
            throw new Error(`API error`, res.status)
        }
        const data = await res.json()
    }
    catch (error) {
        console.error(`Error in showAllUsers(): `, error)
    }
}