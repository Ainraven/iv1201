/**
 * 
 * @returns 
 */
async function loginUser() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    if(!username || !password) {
        alert("Please enter both username and password.")
    }

    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({username, password})
        })

        if(!res.ok){
            throw new Error(`Login failed: ${res.status}`)
        }

        const data = await res.json()
        console.log(data.access)
        if(!data.access) {
            alert("Wrong password or username!")
        }
    } 
    catch(error) {
        console.error(`Error in loginUser()`, error)
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

