import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "PUT";

export async function updateProfile(name, profileData) {
	if (!name) {
		throw new Error("No profile ID provided");
	}

	const updateProfileURL = `${API_SOCIAL_URL}${action}/${name}`;

	const response = await authFetch(updateProfileURL, {
		method,
		body: JSON.stringify(profileData),
	});

	return await response.json();
}
