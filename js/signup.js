var emailSignInput = document.querySelector('#signup-email');
var passwordSignInput = document.querySelector('#signup-password');
var nameInput = document.querySelector('#name');
var signUpbtn = document.querySelector('#signup');
var logInAnchor = document.querySelector('#login');
var msg = document.querySelector('#msg');
var users = [];
var storedUsers = localStorage.getItem("users");
if (storedUsers) {
    users = JSON.parse(storedUsers);
}
function signUp() {
    if (!emailSignInput || !passwordSignInput || !nameInput || !msg)
        return;
    var user = {
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
    }
    else {
        msg.textContent = "Invalid email or email already in use";
        msg.style.cssText = "color: red !important";
    }
}
function isValidEmail(email) {
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
function isNewEmail(email) {
    return !users.some(function (user) { return user.email === email; });
}
function clearForm() {
    if (nameInput)
        nameInput.value = "";
    if (emailSignInput)
        emailSignInput.value = "";
    if (passwordSignInput)
        passwordSignInput.value = "";
}
signUpbtn === null || signUpbtn === void 0 ? void 0 : signUpbtn.addEventListener("click", function () { return signUp(); });
logInAnchor === null || logInAnchor === void 0 ? void 0 : logInAnchor.addEventListener("click", function () {
    window.location.href = "index.html";
});
