document.body.onload = addUserName;
function addUserName() {
    const userName = localStorage.getItem('loggedInUser');
    if (userName !== null) {
        document.getElementById("userName").innerHTML =
            "Hi " + userName;
        document.getElementById("userName").style.display = "inline-block";
    }
}