const registerBtn = document.querySelector(".register");

document.addEventListener("DOMContentLoaded", () => {
  const loadingSpinner = document.getElementById("loading-spinner");
  loadingSpinner.style.display = "block";
  document.body.style = "background: #000";
  document.querySelector("main").style.display = "none";
  setTimeout(() => {
    loadingSpinner.style.display = "none";
    document.body.style.background = 'url("../assets/Login.jpg")';
    document.querySelector("main").style.display = "block";
  }, 2000);

  registerBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const usernameInput = document.querySelector(".input-username input");
    const passwordInput = document.querySelector(".input-password input");

    const usernameValue = usernameInput.value;
    const passwordValue = passwordInput.value;

    if (usernameValue !== "" && passwordValue !== "") {
      localStorage.setItem("username", usernameValue);
      localStorage.setItem("password", passwordValue);

      window.location.href = "../pages/home.html";
    } else {
      alert("Please fill in all fields");
    }
  });
});
