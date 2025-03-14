/**
 * Saves input to localstorage every time input is updated   
 */
async function updateSave() {
    saveInput("firstname")
    saveInput("lastname")
    saveInput("person-number")
    saveInput("username")
    saveInput("password")
}
/**
 * Saves input to a local storage under the name "field"
 * @param {String} field HTML tag ID
 */
async function saveInput(field) {
    const input = document.getElementById(field).value
    console.log("Saving...", input, " in ", field)
    localStorage.setItem(field, input)
}
/**
 * Keeps input fields persistent when reloading
 */
async function persistentForm() {
    persistentInput("firstname")
    persistentInput("lastname")
    persistentInput("person-number")
    persistentInput("username")
    persistentInput("password")
}
/**
 * Restores an input field 
 * @param {String} field HTML tag ID 
 */
async function persistentInput(field) {
    const input = localStorage.getItem(field)
    if(input) document.getElementById(field).value = input
}

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(persistentForm, 50)
})

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
    const personalNumber = document.getElementById("person-number").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    if (!firstname || !lastname || !personalNumber || !username || !password) {
        alert("Please enter your information in all fields.")
    }

    try {
        const res = await fetch("/auth/signup/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstname, lastname, personalNumber, username, password})
        })

        if (!res.ok) {
            throw new Error(`Create new user failed: ${res.status}`)
        }

        const data = await res.json()
        if (!data) {
            alert("Username already in use. Username must be unique!")
            return
        }

        alert(`You successfully signed up, ${data.name}! Welcome!`)

        localStorage.removeItem("firstname")
        localStorage.removeItem("lastname")
        localStorage.removeItem("person-number")
        localStorage.removeItem("username")
        localStorage.removeItem("password")

        window.location.replace("/auth/login")

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
 * @param {string} personalNumber is used for the fetch from the database.
 * @returns true or false depending if the person number is found in the database.
 */
async function getUserByPersonalNumber(personalNumber) {
    const res = await fetch(`/api/users/${personalNumber}`)
    try {
        if (!res.ok) {
            throw new Error(`API error: `, res.status)
        }
        return true
    } catch (error) {
        console.error(`Fetch error: `, error)
    }
}

async function addUserToDatabase(firstname, lastname, personalNumber, username, password) {
    
}

async function sendUserToLoginPage() {
    alert("This button is out of function for now!")
}