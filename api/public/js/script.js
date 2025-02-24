async function getUserById() {
    console.log("hello")
    
    const userID = document.getElementById("userID").value
    if(!userID) {
        alert("Invalid user ID, please enter a number")
        return
    }

    try {
        const res = await fetch(`/api/users/${userID}`)
        if(!res.ok) {
            throw new Error(`API error:`, res.status)
        }
        const data = await res.json()
        printUser(data)
    }
    catch (error) {
        console.error(`Fetch error:`, error)
        document.getElementById("output").innerText = "Error fetching a user."
    }

}
    
async function printUser(data) {
    const user = Array.isArray(data) ? data[0] : data;

    document.getElementById("output").innerText = 
        `data: ${JSON.stringify(user, null, 2)}\n
        name: ${data[0].name} \n
        surname: ${data[0].surname}`
}