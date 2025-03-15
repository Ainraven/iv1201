/**
 * Finds user by their userID 
 * @returns json of a found user
 */
async function getUserById() {    
    const userID = document.getElementById("userID").value
    if(!userID) {
        alert("Invalid user ID, please enter a number")
        return
    }

    try {
        const res = await fetch(`/api/users/${userID}`)
        if(!res.ok) {
            const error = new Error("API error")
            error.status = res.status
            throw error
            //throw new Error(`API error:`, res.status)
        }
        const data = await res.json()
        printUser(data)
    }
    catch (error) {
        console.error(`Fetch error:`, error)
        document.getElementById("output").innerText = "Error fetching a user."
    }
}
 
/**
 * Prints user information
 * @param {*} data user
 */
async function printUser(data) {
    const user = Array.isArray(data) ? data[0] : data;

    document.getElementById("output").innerText = 
        `data: ${JSON.stringify(user, null, 2)}\n
        name: ${data[0].name} \n
        surname: ${data[0].surname}`
}

/**
 * Fetches all users from the database
 */
async function getAllUsers() {
    try{
        const res = await fetch(`api/users`)
        if(!res.ok) {
            const error = new Error("API error")
            error.status = res.status
            throw error
            //throw new Error(`API error`, res.status)
        }
        const data = await res.json()
    }
    catch (error) {
        console.error(`Error in showAllUsers(): `, error)
        window.location.replace(`/${error.status}`)
    }
}