/**
 * 
 * @returns 
 */
async function loginUser() {
    const loginHandle = document.getElementById("loginHandle").value
    const password = document.getElementById("password").value

    console.log()

    if(!loginHandle || !password) {
        alert("Please enter both username/email and password.")
    }

    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({loginHandle, password})
        })

        console.log("here")
        console.log(res)

        if(!res.ok){
            throw new Error(`Login failed: ${res.status}`)
        }

        const data = await res.json()
        
        if(!data) {
            alert("Wrong password or username!")
        }
        window.location.replace("/")
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

