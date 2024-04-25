import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "DELETE";

export async function removePost(id) {
	if (!id) {
		throw new Error("No post ID provided");
	}

	const removePostURL = `${API_SOCIAL_URL}${action}/${id}`;

	const response = await authFetch(removePostURL, {
		method,
	});

	return;
}
