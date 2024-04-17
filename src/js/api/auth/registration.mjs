import { API_BASE_URL } from "../constants.mjs";

export async function register(profile, action, method) {
	const actionURL = new URL(action);
	const registrationURL = `${API_BASE_URL}${actionURL.pathname}`;
	const body = JSON.stringify(profile);

	const response = await fetch(registrationURL, {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body,
	});

	const result = await response.json();
	console.log(result);
}
