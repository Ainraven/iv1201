/**
 * 
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

    /**
     * try to fetch user in database based on person number and username
     *      if user already exist -> alert user that that account already exist
     *      else -> add the user in the database and pass user information to model
     * catch error
     */
}

async function sendUserToLoginPage() {
    /**
     * rerout the user back to the login page
     */
    return
}