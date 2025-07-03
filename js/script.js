"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var emailInput = document.querySelector('#email');
var passwordInput = document.querySelector('#password');
var logInbtn = document.querySelector('#login');
var signUpAnchor = document.querySelector('#signup');
var msg = document.querySelector('#msg');
// 
var users = [];
var storedUsers = localStorage.getItem("users");
if (storedUsers) {
    users = JSON.parse(storedUsers);
}
function signIn() {
    if (!emailInput || !passwordInput || !msg)
        return;
    if (emailInput.value.trim() === "" || passwordInput.value.trim() === "") {
        msg.textContent = "All inputs are required";
        msg.style.cssText = "color: red !important";
        return;
    }
    if (isCorrectEmailAndPassword(emailInput.value, passwordInput.value)) {
        window.location.href = "home.html";
    }
    else {
        msg.textContent = "Incorrect email or password";
        msg.style.cssText = "color: red !important";
    }
}
function isCorrectEmailAndPassword(email, password) {
    for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
        var user = users_1[_i];
        if (user.email === email && user.password === password) {
            localStorage.setItem("userName", user.name);
            return true;
        }
    }
    return false;
}
logInbtn === null || logInbtn === void 0 ? void 0 : logInbtn.addEventListener("click", function () {
    signIn();
});
signUpAnchor === null || signUpAnchor === void 0 ? void 0 : signUpAnchor.addEventListener("click", function () {
    window.location.href = "signup.html";
});
