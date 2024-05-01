import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const reaction = "❤️";
const method = "PUT";

export async function updateReaction(postData) {
	if (!postData.id) {
		throw new Error("No post ID provided");
	}

	const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}/react/${reaction}`;

	const response = await authFetch(updatePostURL, {
		method,
		body: JSON.stringify(postData),
	});

	return await response.json();
}
