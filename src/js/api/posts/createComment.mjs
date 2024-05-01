import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "POST";

// Create post comment
export async function createComment(postData) {
	const createCommentURL = `${API_SOCIAL_URL}${action}/${postData.id}/comment`;

	try {
		// Hide previous error message, if any
		// errContainer.classList.add("hidden");

		// Send to API
		const response = await authFetch(createCommentURL, {
			method,
			body: JSON.stringify(postData.body),
		});

		// Handle error
		if (!response.ok) {
			const errorData = await response.json();

			// Display error
		}

		// Handle success
		if (response.ok) {
			const res = await response.json();

			// Clear errors

			return res;
		}
	} catch (error) {
		throw new Error(error);
	}
}
