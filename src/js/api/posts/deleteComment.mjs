import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "DELETE";

export async function removeComment(postId, commentId) {
	if (!commentId) {
		throw new Error("No comment ID provided");
	}

	const removePostURL = `${API_SOCIAL_URL}${action}/${postId}/comment/${commentId}`;

	const response = await authFetch(removePostURL, {
		method,
	});

	return;
}
