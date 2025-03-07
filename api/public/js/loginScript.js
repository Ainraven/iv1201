/**
 * 
 * @returns 
 */
async function loginUser() {
    const loginHandle = document.getElementById("loginHandle").value
    const password = document.getElementById("password").value

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

        console.log("Hi")
        if(!res.ok){
            throw new Error(`Login failed: ${res.status}`)
        }

        console.log("RESPONSE:", res)
        const data = await res.json()
        console.log("DATA: ", data)
        console.log("TOKEN: ", data.token)
        
        if(!data) {
            alert("Wrong password or username!")
        }

        localStorage.setItem("token", data.token)

        // window.location.replace("/applications")
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

