/**
 * Tries to create a new user. If any information field in the view is not
 * filled, the function returns an alert prompting the user to fill in all
 * fields. The function then checks if username and person number is unique,
 * and based on that either send the information to the database or sends 
 * another alert to the user that the username and or person number is already
 * in use.
 */
async function createNewUser() {
    const firstname = document.getElementById("firstname").value
    const lastname = document.getElementById("lastname").value
    const personNumber = document.getElementById("person-number").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    if (!firstname || !lastname || !personNumber || !username || !password) {
        alert("Please enter your information in all fields.")
    }

    /* const userName = getUserByUsername(username)
    const personNum = getUserByPersonNumber(personNumber)

    if(!personNum) {
        if (!userName) {
            addUserToDatabase(firstname, lastname, personNumber, username, password)
            //sendUserToLoginPage()
        } else {
            alert("Username is already taken. Please enter a unique username.")
        }
    } else {
        alert("There already is a user with that person number.")
    } */

    try {
        const res = await fetch("/api/auth/create-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstname, lastname, personNumber, username, password})
        })

        if (!res.ok) {
            throw new Error(`Create new user failed: ${res.status}`)
        }

        const data = await res.json()

        if (data) {
            alert("Username already in use. Username must be unique!")
        }

    } catch (error) {
        console.error("Error in createNewUser()", error)
    }
}

/**
 * Resets the values for the inputs.
 */
window.onload = function () {
    document.getElementById("inputs").reset()
}

/**
 * Calls for a search in the database for the username the user wants.
 * Since username is used for login, the username must be unique.
 * @param {string} username is used for the fetch from the database.
 * @returns true or false if the username is found in the database or not.
 */
async function getUserByUsername(username) {
    try {
        const res = await fetch(`/api/users/${username}`)

        if (!res.ok) {
            throw new Error(`API error: `, res.status)
        }
        return true
    } catch (error) {
        console.error(`Fetch error: `, error)
    }
    return false
}

/**
 * Calls for a search in the database for the user's person number. 
 * If the person number already is registered then the user already exist.
 * @param {string} personNumber is used for the fetch from the database.
 * @returns true or false depending if the person number is found in the database.
 */
async function getUserByPersonNumber(personNumber) {
    const res = await fetch(`/api/users/${personNumber}`)
    try {
        if (!res.ok) {
            throw new Error(`API error: `, res.status)
        }
        return true
    } catch (error) {
        console.error(`Fetch error: `, error)
    }
}

async function addUserToDatabase(firstname, lastname, personNumber, username, password) {
    
}

async function sendUserToLoginPage() {
    alert("This button is out of function for now!")
}