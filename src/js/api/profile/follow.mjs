import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "PUT";

export async function followProfile(name) {
	if (!name) {
		throw new Error("No profile ID provided");
	}

	const followProfileURL = `${API_SOCIAL_URL}${action}/${name}/follow`;

	const response = await authFetch(followProfileURL, {
		method,
	});

	return await response.json();
}

export async function unfollowProfile(name) {
	if (!name) {
		throw new Error("No profile ID provided");
	}

	const unfollowProfileURL = `${API_SOCIAL_URL}${action}/${name}/unfollow`;

	const response = await authFetch(unfollowProfileURL, {
		method,
	});

	return await response.json();
}
