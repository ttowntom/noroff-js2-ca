import { login } from "../api/auth/login.mjs";

export function setLoginFormListener() {
	const form = document.querySelector("#loginForm");

	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const form = e.target;
			const formData = new FormData(form);
			const profile = Object.fromEntries(formData.entries());
			const action = form.action;
			const method = form.method;

			// Send to API
			login(profile, action, method);
		});
	}
}
