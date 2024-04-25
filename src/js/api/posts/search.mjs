import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "?_author=true&_reactions=true&_comments=true";

export async function getSearchRes(searchTerm, limit = 100, page = 1) {
	try {
		const getPostURL = `${API_SOCIAL_URL}/posts/search${action}&q=${searchTerm}&limit=${limit}&page=${page}`;

		const response = await authFetch(getPostURL);

		return await response.json();
	} catch (error) {
		throw new Error("Error getting posts: " + error.message);
	}
}
