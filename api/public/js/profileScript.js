/**
 * Displays profile information depending on user's role
 */
async function renderProfileInfo() {
    
    const token = localStorage.getItem("token")
    if(!token) {
        alert("You are not logged in")
        window.location.replace("/auth/login")
        return
    }
    const decodedToken = parseJwt(token)
    
    const res = await fetch(`/api/users/${decodedToken.id}`)
    if(!res.ok) {
        const error = new Error("API error")
        error.status = res.status
        throw error
        //throw new Error(`API error`, res.status)
    }
    
    const data = await res.json()
    
    addLine('h2', "First name", data[0].name)
    addLine('h2', "Last name", data[0].surname)
    addLine('h2', "Username", data[0].username)
    addLine('h2', "Email", data[0].email)
    addLine('h2', "Personal Number", data[0].pnr)
    
    if(data[0].role_id == 1) {
        addLine('h2', "Role", "Recruiter")
    } else {
        addLine('h2', "Role", "Applicant")
        const appl = await fetch(`/api/applications/${data[0].person_id}`)
        if(!appl.ok) {
            const error = new Error("API error")
            error.status = res.status
            throw error
            //throw new Error(`API error`, appl.status)
        }
        const applData = await appl.json()

        switch(applData[0].application_status_id) {
            case 1: 
                addLine('h2', "Application status", "Pending")
                break 
            case 2: 
                addLine('h2', "Application status", "Accepted")
                break 
            case 3: 
                addLine('h2', "Application status", "Rejected")
                break
            default:
                console.log(`Status ${application.application_status_id} does not exist`)
        }
    }
    
    console.log("THIS IS DATA", data)
    
}
/**
 * Adds a singular line 
 * @param {String} tag HTML tag, like "h2" 
 * @param {String} item Title text, like "Name"
 * @param {String} value Value text, like "Violet"
 */
async function addLine(tag, item, value) {
    const info = document.getElementById("myprofile")
    const element = document.createElement(tag)
    if(value == null) value = "No data"
    element.appendChild(document.createTextNode(item + ": " + value))
    info.appendChild(element)
    // element.setAttribute("class", cssClass)
}

/**
 * Parses jwt token to use variables inside:
 *  - username
 *  - role (1 or 2)
 *  - id (of a person)
 * @param {*} token 
 * @returns 
 */
function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split(".")[1]))
    } catch (err) {
        console.error("Invalid token format", e)
        return null
    }
}

document.addEventListener("DOMContentLoaded", function () {
    renderProfileInfo()
})
