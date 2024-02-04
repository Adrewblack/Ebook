const registerBtn = document.querySelector(".register");

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
