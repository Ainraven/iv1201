function checkUserRole() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.replace("/login"); // Redirect if no token
        return;
    }

    const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    console.log("User role:", decoded.role);

    if (decoded.role !== 1) {  // Recruiters only
        alert("You are not authorized to view this page.");
        window.location.replace("/");
    }
}

checkUserRole();