async function loadNavigation() {
    try {
        var navlist = document.getElementById("navlist")

        const token = localStorage.getItem("token")
        if(!token) {
            createNavElement("/auth/login", "Login")
            createNavElement("/auth/signup", "Sign up")
        } else {
            const decodedToken = parseJwt(token)
            console.log(decodedToken)
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

async function createNavElement(endpoint, text) {
    var element = document.createElement('li')
    var elementLink = document.createElement('a')
    elementLink.setAttribute("href", endpoint)
    elementLink.appendChild(document.createTextNode(text))
    element.appendChild(elementLink)
    navlist.appendChild(element)
}

function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split(".")[1]))
    } catch (err) {
        console.error("Invalid token format", e)
        return null
    }
}