interface User {
  name: string;
  email: string;
  password: string;
}

const emailSignInput = document.querySelector<HTMLInputElement>('#signup-email');
const passwordSignInput = document.querySelector<HTMLInputElement>('#signup-password');
const nameInput = document.querySelector<HTMLInputElement>('#name');
const signUpbtn = document.querySelector<HTMLButtonElement>('#signup');
const logInAnchor = document.querySelector<HTMLAnchorElement>('#login');
const msg = document.querySelector<HTMLElement>('#msg');

let users: User[] = [];

const storedUsers = localStorage.getItem("users");
if (storedUsers) {
  users = JSON.parse(storedUsers);
}

function signUp(): void {
  if (!emailSignInput || !passwordSignInput || !nameInput || !msg) return;

  const user: User = {
    name: nameInput.value.trim(),
    email: emailSignInput.value.trim(),
    password: passwordSignInput.value.trim(),
  };

  if (!user.name || !user.email || !user.password) {
    msg.textContent = "All inputs are required";
    msg.style.cssText = "color: red !important";
    return;
  }

  if (isValidEmail(user.email) && isNewEmail(user.email)) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    clearForm();
    msg.textContent = "Success";
    msg.style.cssText = "color: green !important";
  } else {
    msg.textContent = "Invalid email or email already in use";
    msg.style.cssText = "color: red !important";
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isNewEmail(email: string): boolean {
  return !users.some(user => user.email === email);
}

function clearForm(): void {
  if (nameInput) nameInput.value = "";
  if (emailSignInput) emailSignInput.value = "";
  if (passwordSignInput) passwordSignInput.value = "";
}

signUpbtn?.addEventListener("click", () => signUp());

logInAnchor?.addEventListener("click", () => {
  window.location.href = "index.html";
});
