import { register } from "../api/auth/registration.mjs";

export function setRegistrationFormListener() {
	const form = document.querySelector("#registrationForm");

	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const form = e.target;
			const formData = new FormData(form);
			const profile = Object.fromEntries(formData.entries());
			const action = form.action;
			const method = form.method;

			// Send to API
			register(profile, action, method);
		});
	}
}
