/**
 * Takes username and password, verifies and stores user token in local storage
 * Sends user to the home page afterwards
 */
async function loginUser() {
    const loginHandle = document.getElementById("loginHandle").value
    const password = document.getElementById("password").value

    if(!loginHandle || !password) {
        alert("Please enter both username/email and password.")
    }

    try {
        const res = await fetch("/auth/login/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({loginHandle, password})
        })

        if(!res.ok){
            throw new Error(`Login failed: ${res.status}`)
        }

        const data = await res.json()
        
        if(!data) {
            alert("Wrong password or username!")
        }

        localStorage.setItem("token", data.token)

        window.location.replace("/")
    } 
    catch(error) {
        console.error(`Error in loginUser()`, error)
    }
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

