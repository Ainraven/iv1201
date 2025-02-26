
/**
 * 
 * @returns 
 */
async function loginToUser() {
    const username = document.getElementById("username").value
    //const password = document.getElementById("password").value

    console.log(username)
    console.log(password)

    if(!username || !password) {
        alert("Please enter both username and password.")
    }

    /**
     * try fetch user in database
     *      if username does not exist -> alert that user did not exist
     *      if password did not match user -> alert that user has the wrong password
     *      else send user back to page that prompted login or just some type of main page
     * catch error
     */
}

/**
 * 
 * @returns 
 */
async function goToForgotPassword() {
    /**
     * 
     */
    return
}

