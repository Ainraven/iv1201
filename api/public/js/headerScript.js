/**
 * Loads buttons in the header navigation that are relevant for that specific user. 
 * If a person is not logged in, they will see "login" and "signup"
 * IF a person is logged in, they will see "log out" and "my profile"
 * If they are a recruiter, they will see "applications"
 */
async function loadNavigation() {
    try {
        const token = localStorage.getItem("token")
        if(!token) {
            createNavElement("href", "/auth/login", "Login")
            createNavElement("href", "/auth/signup", "Sign up")
        } else {
            const decodedToken = parseJwt(token)
            if(decodedToken.role === 1) {
                createNavElement("href", "/applications", "Applications")
            }
            createNavElement("href", "/myprofile", decodedToken.username)
            createNavElement("onclick", "logout()", "Log out")
        }   
    }
    catch(err){
        console.error(`Error in loadNavigation()`, err)
    }
}

/**
 * Adds an element to the navigation bar
 * @param {String} attr element attribute, e.g. href
 * @param {String} attrText function or link for attribute 
 * @param {String} text describes what the button does
 */
async function createNavElement(attr, attrText, text) {
    var navlist = document.getElementById("navlist")
    var element = document.createElement('li')
    var elementLink = document.createElement('a')
    elementLink.setAttribute(attr, attrText)
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

/**
 * Logs person out by removing their token from the local storage and redirecting them to home page
 */
async function logout() {
    localStorage.removeItem("token")
    window.location.replace("/")
}

document.addEventListener("DOMContentLoaded", function () {
    loadNavigation();
});
