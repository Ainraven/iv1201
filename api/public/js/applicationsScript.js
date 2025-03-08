


// function checkUserRole() {
//     console.log("wow")
//     const token = localStorage.getItem("token");
//     console.log("This is token from auth.js", token )

//     if (!token) {
//         window.location.replace("/login"); // Redirect if no token
//         return;
//     }

//     const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
//     console.log("User role:", decoded.role);

//     if (decoded.role !== 1) {  // Recruiters only
//         alert("You are not authorized to view this page.");
//         window.location.replace("/");
//     }
// }

// checkUserRole();

/**
 * Fetches applications from api/applications
 * Calls for showApplications to display them for the user
*/
async function getApplications() {
    
    try {
        const token = localStorage.getItem("token")
        console.log("This is token from getApplications: ", token)
        if(!token) {
            alert("You are not logged in")
            window.location.replace("/login")
            return
        }

        const res = await fetch(`api/applications/api`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        if(!res.ok) {
            throw new Error(`API error`, res.status)
        }
        console.log("RESPONSE: ", res.status)


        const data = await res.json()
        showApplications(data)
    }
    catch (error) {
        console.error(`Error in getAplications();`, error)
    }
}

/**
 * Displays applications from "data" in a table
 * @param {json} data json file with applications
 */
async function showApplications(data) {
    var list = document.getElementById("applications")
    for(const application of data){
        var entry = document.createElement('tr')
        entry.setAttribute("class", "applicationItem")
        entry.setAttribute("id", `application${application.application_id}`)

        var name = document.createElement('td')
        var surname = document.createElement('td')
        var status = document.createElement('td')
        status.setAttribute("id", `status-application${application.application_id}`)

        name.appendChild(document.createTextNode(
            `${JSON.stringify(application.person.name, null, 2).replace(/\"/g, "")}`))
        surname.appendChild(document.createTextNode(
            `${JSON.stringify(application.person.surname, null, 2).replace(/\"/g, "")}`))
        status.appendChild(document.createTextNode(
            `${JSON.stringify(application.application_status, null, 2).replace(/\"/g, "")}`))

        entry.appendChild(name)
        entry.appendChild(surname)
        entry.appendChild(status)

        var acceptTd = document.createElement('td')
        var acceptBtn = document.createElement('button')
        acceptBtn.appendChild(document.createTextNode("Accept"))
        acceptBtn.setAttribute("onclick", `acceptApplication(${application.application_id})`)
        acceptTd.appendChild(acceptBtn)
        entry.appendChild(acceptTd)
        
        var rejectTd = document.createElement('td')
        var rejectBtn = document.createElement('button')
        rejectBtn.appendChild(document.createTextNode("Reject"))
        rejectBtn.setAttribute("onclick", `rejectApplication(${application.application_id})`)
        rejectTd.appendChild(rejectBtn)
        entry.appendChild(rejectTd)

        var pendingTd = document.createElement('td')
        var pendingBtn = document.createElement('button')
        pendingBtn.appendChild(document.createTextNode("Pending"))
        pendingBtn.setAttribute("onclick", `pendingApplication(${application.application_id})`)
        pendingTd.appendChild(pendingBtn)
        entry.appendChild(pendingTd)

        list.appendChild(entry)
    }
}

/**
 * Changes application status of {id} to accepted state and displays the changes
 * @param {number} id 
 */
async function acceptApplication(id) {
    try {
        const res = await fetch(`api/applications/accept/${id}`)
        if(!res.ok) {
            throw new Error(`API error`, res.status)
        }
        const data = await res.json()
        document.getElementById(`status-application${id}`).innerHTML = `${data[0].application_status}`
    }
    catch (error) {
        console.error(`Error in acceptApplication();`, error)
    }
}

/**
 * Changes application status of {id} to rejected state and displays the changes
 * @param {number} id 
 */
async function rejectApplication(id) {
    try {
        const res = await fetch(`api/applications/reject/${id}`)
        if(!res.ok) {
            throw new Error(`API error`, res.status)
        }
        const data = await res.json()
        document.getElementById(`status-application${id}`).innerHTML = `${data[0].application_status}`
    }
    catch (error) {
        console.error(`Error in rejectApplication();`, error)
    }
}

/**
 * Changes application status of {id} to pending state and displays the changes
 * @param {number} id 
 */
async function pendingApplication(id) {
    try {
        const res = await fetch(`api/applications/pending/${id}`)
        if(!res.ok) {
            throw new Error(`API error`, res.status)
        }
        const data = await res.json()
        document.getElementById(`status-application${id}`).innerHTML = `${data[0].application_status}`
    }
    catch (error) {
        console.error(`Error in pendingApplication();`, error)
    }
}