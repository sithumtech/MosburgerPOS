
function validateForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if username and password match
    if (username === "admin" && password === "admin123") {
        window.location.href = "pos.html"; // Redirect to abc.html on success
    } else {
        alert("Invalid username or password. Please try again.");
    }
}
