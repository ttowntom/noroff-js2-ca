import { API_BASE_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";
import { getProfile } from "../profile/profileRead.mjs";

export async function login(profile, action, method) {
	const actionURL = new URL(action);
	const loginURL = `${API_BASE_URL}${actionURL.pathname}`;
	const body = JSON.stringify(profile);

	let response;
	try {
		response = await fetch(loginURL, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body,
		});

		// Handle error
		if (!response.ok) {
			const errorData = await response.json();
			const errContainer = document.querySelector(`#loginErrorContainer`);
			const errMsg = document.querySelector(`#loginError`);

			// Show error message
			errContainer.classList.remove("hidden");
			errContainer.classList.add("flex");
			if (errorData) {
				errMsg.textContent = errorData.errors[0].message;
			} else {
				errMsg.textContent = error.message;
			}
		}

		// Handle success
		const data = await response.json();
		const { accessToken, ...user } = data.data;

		// Save token to local storage
		storage.save("token", accessToken);

		// Get following
		const profile = await getProfile(user.name);
		user.following = profile.data.following;

		// Save to local storage
		storage.save("profile", user);

		// Redirect
		window.location.href = "/profile";
	} catch (error) {
		throw new Error(error);
	}
}
