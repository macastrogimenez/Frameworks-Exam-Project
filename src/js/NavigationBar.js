
function addUserName() {
    const userName = localStorage.getItem('loggedInUser');
    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');
    const userElement = document.getElementById("userName");

    if (!userElement || !loginLink || !logoutLink) return;

    if (userName !== null) {
        userElement.innerHTML = "Hi " + userName;
        userElement.style.display = "inline-block";
        loginLink.style.display = "none";
        logoutLink.style.display = "block";
    } else {
        userElement.style.display = "none";
        loginLink.style.display = "block";
        logoutLink.style.display = "none";
    }
}

function logout(event) {
    event.preventDefault();
    localStorage.removeItem('loggedInUser');
    window.location.href = "LoginPage.html";
}


// declares function to
// fetch the HTML from file NavigationBar.html,
// then this 'navbar' div and
// add the NavigationBar HTML code to it
// finally runs the function with the id of the div and the file name
function loadNavbar() {
    fetch("NavigationBar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar").innerHTML = data;

            //adding username after loading the navbar
            addUserName();


            const logoutLink = document.getElementById("logoutLink");
            if (logoutLink) logoutLink.addEventListener("click", logout);
        });
}


document.addEventListener("DOMContentLoaded", loadNavbar);