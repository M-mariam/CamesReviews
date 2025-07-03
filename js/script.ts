export{}
const emailInput = document.querySelector<HTMLInputElement>('#email');
const passwordInput = document.querySelector<HTMLInputElement>('#password');
const logInbtn = document.querySelector<HTMLButtonElement>('#login');
const signUpAnchor = document.querySelector<HTMLAnchorElement>('#signup');
const msg = document.querySelector<HTMLElement>('#msg');

interface User {
  name: string;
  email: string;
  password: string;
}
// 
let users: User[] = [];

const storedUsers = localStorage.getItem("users");
if (storedUsers) {
  users = JSON.parse(storedUsers);
}

function signIn(): void {
  if (!emailInput || !passwordInput || !msg) return;

  if (emailInput.value.trim() === "" || passwordInput.value.trim() === "") {
    msg.textContent = "All inputs are required";
    msg.style.cssText = "color: red !important";
    return;
  }

  if (isCorrectEmailAndPassword(emailInput.value, passwordInput.value)) {
    window.location.href = "home.html";
  } else {
    msg.textContent = "Incorrect email or password";
    msg.style.cssText = "color: red !important";
  }
}

function isCorrectEmailAndPassword(email: string, password: string): boolean {
  for (const user of users) {
    if (user.email === email && user.password === password) {
      localStorage.setItem("userName", user.name);
      return true;
    }
  }
  return false;
}

logInbtn?.addEventListener("click", () => {
  signIn();
});

signUpAnchor?.addEventListener("click", () => {
  window.location.href = "signup.html";
});
