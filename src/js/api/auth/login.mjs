import { API_BASE_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

export async function login(profile, action, method) {
	const actionURL = new URL(action);
	const loginURL = `${API_BASE_URL}${actionURL.pathname}`;
	const body = JSON.stringify(profile);

	const response = await fetch(loginURL, {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body,
	});

	const data = await response.json();
	const { accessToken, ...user } = data.data;

	// Save to local storage
	storage.save("token", accessToken);
	storage.save("profile", user);
}
