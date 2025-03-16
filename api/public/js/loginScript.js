/**
 * Saves input to localstorage every time input is updated   
 */
async function updateSave() {
    saveInput("loginHandle")
}
/**
 * Saves input to a local storage under the name "field"
 * @param {String} field HTML tag ID
 */
async function saveInput(field) {
    const input = document.getElementById(field).value
    localStorage.setItem(field, input)
}
/**
 * Keeps input fields persistent when reloading
 */
async function persistentForm() {
    const loginHandle = localStorage.getItem("loginHandle")
    if(loginHandle) document.getElementById("loginHandle").value = loginHandle
}

document.addEventListener("DOMContentLoaded", function () {
    persistentForm()
})

/**
 * Takes username and password, verifies and stores user token in local storage
 * Sends user to the home page afterwards
 */
async function loginUser() {
    const loginHandle = document.getElementById("loginHandle").value
    const password = document.getElementById("loginPassword").value

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

        const data = await res.json()
        if(!res.ok){
            alert(data.message)
            throw new Error(`Login failed: ${res.status}`)
        }

        if(!data) {
            console.log("data does not exist")
        }

        localStorage.setItem("token", data.token)
        localStorage.removeItem("loginHandle")

        window.location.replace("/")
    } 
    catch(error) {
        alert("500: Server error")
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


