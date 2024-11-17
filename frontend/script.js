// This section is for the registration form
const registerForm = document.querySelector("#registerForm");

const loginForm = document.querySelector("#login-form");
const errorMsgLogin = document.querySelector("#error-message");

let users = [];

registerForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const name = document.querySelector("#name").value;
	const email = document.querySelector("#email").value;
	const password = document.querySelector("#password").value;
	const role = document.querySelector("#role").value;

	const user = {
		name,
		email,
		password,
		role,
	};

	users = JSON.parse(localStorage.getItem("users")) || [];
	const userExists = users.find((u) => u.email === user.email);
	if (userExists) {
		alert("User already exists!");
		throw new Error("User already exists!");
	} else {
		users.push(user);
		localStorage.setItem("users", JSON.stringify(users));
		alert("User registered successfully!");
		window.location.href = "index.html";
	}
});
