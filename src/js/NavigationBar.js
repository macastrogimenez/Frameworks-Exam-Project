document.body.onload = addUserName;
function addUserName() {
    const userName = localStorage.getItem('loggedInUser');
    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');

    if (userName !== null) {
        document.getElementById("userName").innerHTML = "Hi " + userName;
        document.getElementById("userName").style.display = "inline-block";
        loginLink.style.display = "none";
        logoutLink.style.display = "block";
    } else {
        loginLink.style.display = "block";
        logoutLink.style.display = "none";
    }
}

function logout(event) {
    event.preventDefault();
    localStorage.removeItem('loggedInUser');
    window.location.href = "LoginPage.html";
}