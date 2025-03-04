async function getAllApplications() {
    try {
        const res = await fetch(`api/applications`)
        if(!res.ok) {
            throw new Error(`API error`, res.status)
        }
        const data = await res.json()
        showApplications(data)
    }
    catch (error) {
        console.error(`Error in getAllAplications();`, error)
    }
}
async function showApplications(data) {
    var list = document.getElementById("applications")
    for(const application of data){
        var entry = document.createElement('tr')
        entry.setAttribute("class", "applicationItem")
        entry.setAttribute("id", `application${application.person_id}`)

        var name = document.createElement('td')
        var surname = document.createElement('td')
        var status = document.createElement('td')
        status.setAttribute("id", `status-application${application.person_id}`)

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
        acceptBtn.setAttribute("onclick", `acceptFun(${application.application_id})`)
        acceptTd.appendChild(acceptBtn)
        entry.appendChild(acceptTd)
        
        var rejectTd = document.createElement('td')
        var rejectBtn = document.createElement('button')
        rejectBtn.appendChild(document.createTextNode("Reject"))
        rejectBtn.setAttribute("onclick", `rejectFun(${application.application_id})`)
        rejectTd.appendChild(rejectBtn)
        entry.appendChild(rejectTd)

        list.appendChild(entry)
    }
}

async function acceptFun(id) {
    try {
        const res = await fetch(`api/applications/accept/${id}`)
        if(!res.ok) {
            throw new Error(`API error`, res.status)
        }
        const data = await res.json()
    }
    catch (error) {
        console.error(`Error in getAllAplications();`, error)
    }
}
async function rejectFun(id) {
    try {
        const res = await fetch(`api/applications/reject/${id}`)
        if(!res.ok) {
            throw new Error(`API error`, res.status)
        }
        const data = await res.json()
    }
    catch (error) {
        console.error(`Error in getAllAplications();`, error)
    }
}