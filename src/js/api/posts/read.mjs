import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts?_author=true&_reactions=true&_comments=true";

export async function getPosts() {
	const getPostURL = `${API_SOCIAL_URL}${action}`;

	const response = await authFetch(getPostURL);

	return await response.json();
}

export async function getPost(id) {
	if (!id) {
		throw new Error("No post ID provided");
	}

	const getPostURL = `${API_SOCIAL_URL}${action}/${id}`;

	const response = await authFetch(getPostURL);

	return await response.json();
}
