import { API_BASE_URL } from "../constants.mjs";
import { login } from "./login.mjs";

export async function register(profile, action, method) {
	const actionURL = new URL(action);
	const registrationURL = `${API_BASE_URL}${actionURL.pathname}`;
	const body = JSON.stringify(profile);

	try {
		const response = await fetch(registrationURL, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body,
		});

		// Handle error
		if (!response.ok) {
			const errorData = await response.json();
			const errContainer = document.querySelector(`#registerErrorContainer`);
			const errMsg = document.querySelector(`#registerError`);

			// Show error message
			errContainer.classList.remove("hidden");
			errContainer.classList.add("flex");
			if (errorData) {
				errMsg.textContent = errorData.errors[0].message;
			} else {
				errMsg.textContent = error.message;
			}
		} else if (response.ok) {
			// Handle success
			// Log in user after registration
			const loginProfile = {
				email: profile.email,
				password: profile.password,
			};
			const loginAction = `${API_BASE_URL}/auth/login`;
			const loginMethod = "POST";
			login(loginProfile, loginAction, loginMethod);
		}
	} catch (error) {
		throw new Error(error);
	}
}
