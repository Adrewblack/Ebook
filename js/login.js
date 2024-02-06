const registerBtn = document.querySelector(".register");
const passwordEye = document.querySelector(".show-password");

const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".exit");

const successModal = document.querySelector(".successfull");

passwordEye.addEventListener("click", (e) => {
  if (e.target.previousElementSibling.type === "password") {
    e.target.previousElementSibling.type = "text";
    passwordEye.textContent = "visibility_off";
  } else {
    e.target.previousElementSibling.type = "password";
    passwordEye.textContent = "visibility";
  }
});

let regex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;:'",.<>?/]).{8,}$/;

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("hello");

  const usernameInput = document.querySelector(".input-username input");
  const passwordInput = document.querySelector(".input-password input");

  const usernameValue = usernameInput.value;
  const passwordValue = passwordInput.value;

  if (regex.test(passwordValue) && usernameValue.length > 0) {
    successModal.classList.add("visible");
    setTimeout(() => {
      localStorage.setItem("username", usernameValue);
      localStorage.setItem("password", passwordValue);
      window.location.href = "../pages/home.html";
    }, 2000);
  } else {
    modal.style.top = "10px";
  }
});

closeModal.addEventListener("click", () => {
  modal.style.top = "-200px";
});

document.addEventListener("DOMContentLoaded", () => {
  const loadingSpinner = document.getElementById("loading-spinner");
  loadingSpinner.style.display = "block";
  document.body.style.background = "#000";
  document.querySelector("main").style.display = "none";
  setTimeout(() => {
    loadingSpinner.style.display = "none";
    document.body.style.background = 'url("../assets/Login.jpg")';
    document.querySelector("main").style.display = "block";
  }, 2000);
});
