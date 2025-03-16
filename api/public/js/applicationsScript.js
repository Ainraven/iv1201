/**
 * Fetches applications from api/applications
 * Calls for showApplications to display them for the user
*/
async function getApplications() {
    try {
        const token = localStorage.getItem("token")
        if(!token) {
            alert("You are not logged in")
            window.location.replace("/auth/login")
            return
        }

        const res = await fetch(`/api/applications/`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()

        if(!res.ok) {
            if(res.status === 403)
                window.location.replace("/403")
            else
                alert(data.message)
            throw new Error(`Application fetch failed: ${res.status}`)
        }

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
    var appl = document.getElementById("applicationList")
    
    var title = document.createElement('h1')
    title.appendChild(document.createTextNode("Applications"))
    appl.appendChild(title)
    
    var list = document.createElement('table')
    appl.appendChild(list)
    var tr = document.createElement('tr')
    list.appendChild(tr)
    var nameTitle = document.createElement('th')
    nameTitle.appendChild(document.createTextNode("Name"))
    var surnameTitle = document.createElement('th')
    surnameTitle.appendChild(document.createTextNode("Surname"))
    var statusTitle = document.createElement('th')
    statusTitle.appendChild(document.createTextNode("Application status"))
    tr.appendChild(nameTitle)
    tr.appendChild(surnameTitle)
    tr.appendChild(statusTitle)
    tr.appendChild(document.createElement('th'))
    tr.appendChild(document.createElement('th'))
    tr.appendChild(document.createElement('th'))

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

        switch(application.application_status_id){
            case 1: 
                status.appendChild(document.createTextNode("Pending"))
                break 
            case 2: 
                status.appendChild(document.createTextNode("Accepted"))
                break 
            case 3: 
                status.appendChild(document.createTextNode("Rejected"))
                break
            default:
                console.log(`Status ${application.application_status_id} does not exist`)
                break
        }


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
        const data = await res.json()
        if(!res.ok) {
            if(res.status === 403)
                window.location.replace("/403")
            else
                alert(data.message)
            throw new Error(`Application status modification fetch failed: ${res.status}`)
        }

        document.getElementById(`status-application${id}`).innerHTML = `Accepted`

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
        const data = await res.json()
        if(!res.ok) {
            if(res.status === 403)
                window.location.replace("/403")
            else
                alert(data.message)
                throw new Error(`Application status modification fetch failed: ${res.status}`)
        }

        document.getElementById(`status-application${id}`).innerHTML = `Rejected`
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
        const data = await res.json()
        if(!res.ok) {
            if(res.status === 403)
                window.location.replace("/403")
            else
                alert(data.message)
                throw new Error(`Application status modification fetch failed: ${res.status}`)
        }

        document.getElementById(`status-application${id}`).innerHTML = `Pending`
    }
    catch (error) {
        console.error(`Error in pendingApplication();`, error)
    }
}