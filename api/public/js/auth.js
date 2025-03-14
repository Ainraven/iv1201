/**
 * Checks if user is a recruiter
 * If they are not, sends them to a home page
 * If they are not logged in, sends them toa login page
 */
function checkUserRole() {
    const token = localStorage.getItem("token");
    console.log("This is token from auth.js", token )

    if (!token) {
        window.location.replace("/login"); // Redirect if no token
        return;
    }

    const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload

    if (decoded.role !== 1) {  // Recruiters only
        alert("You are not authorized to view this page.");
        window.location.replace("/");
    }
}

checkUserRole();