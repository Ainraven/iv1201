/**
 * Loads buttons in the header navigation that are relevant for that specific user. 
 * If a person is not logged in, they will see "login" and "signup"
 * IF a person is logged in, they will see "log out" and "my profile"
 * If they are a recruiter, they will see "applications"
 */
async function loadNavigation() {
    try {
        var navlist = document.getElementById("navlist")

        const token = localStorage.getItem("token")
        if(!token) {
            createNavElement("/auth/login", "Login")
            createNavElement("/auth/signup", "Sign up")
        } else {
            const decodedToken = parseJwt(token)
            if(decodedToken.role === 1) {
                createNavElement("/applications", "Applications")
            }
            createNavElement("/myprofile", decodedToken.username)
            createNavElement("/auth/logout", "Log out")
        }   
    }
    catch(err){
        console.error(`Error in loadNavigation()`, err)
    }
}

/**
 * Adds an element to the navigation bar
 * @param {String} endpoint link to a page 
 * @param {String} text describes what the button does
 */
async function createNavElement(endpoint, text) {
    var element = document.createElement('li')
    var elementLink = document.createElement('a')
    elementLink.setAttribute("href", endpoint)
    elementLink.appendChild(document.createTextNode(text))
    element.appendChild(elementLink)
    navlist.appendChild(element)
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