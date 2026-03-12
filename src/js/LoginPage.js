function login(event) {
  event.preventDefault();

  const savedUsername = localStorage.getItem("username");
  const savedPassword = localStorage.getItem("password");

  const inputUsername = document.getElementById("loginUsername").value;
  const inputPassword = document.getElementById("loginPassword").value;

  if (inputUsername === savedUsername && inputPassword === savedPassword) {
    alert("Login successful!");
    localStorage.setItem("loggedInUser", savedUsername);
    window.location.href = "HomePage.html";
    return;
  }

  alert("Wrong username or password!");
}
