import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "?_following=true&_followers=true";

export async function getProfiles(limit = 100, page = 1) {
	try {
		const getProfilesURL = `${API_SOCIAL_URL}/profiles${action}&limit=${limit}&page=${page}`;

		const response = await authFetch(getProfilesURL);

		return await response.json();
	} catch (error) {
		throw new Error("Error getting profiles: " + error.message);
	}
}

export async function getProfile(name) {
	if (!name) {
		throw new Error("No profile ID provided");
	}

	try {
		const getProfileURL = `${API_SOCIAL_URL}/profiles/${name}${action}`;

		const response = await authFetch(getProfileURL);

		return await response.json();
	} catch (error) {
		throw new Error("Error getting profile: " + error.message);
	}
}
