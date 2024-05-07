import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { getPost } from "./read.mjs";
import { postTemplate } from "../../templates/post.mjs";
import { alertContainerTemplate } from "../../helpers/alertContainer.mjs";

const errContainer = document.querySelector(`#postErrorContainer`);
const errMsg = document.querySelector(`#postError`);

const action = "/posts";
const method = "POST";

// Render post to DOM
async function renderPost(postId) {
	const feedContainer = document.querySelector("#feed");
	const postData = await getPost(postId);
	feedContainer.prepend(postTemplate(postData.data));
}

// Create post
export async function createPost(postData) {
	const createPostURL = `${API_SOCIAL_URL}${action}`;

	try {
		// Hide previous error message, if any
		errContainer.classList.add("hidden");

		// Send to API
		const response = await authFetch(createPostURL, {
			method,
			body: JSON.stringify(postData),
		});

		// Handle error
		if (!response.ok) {
			const errorData = await response.json();

			// Show error message
			errContainer.classList.remove("hidden");
			errContainer.classList.add("flex");
			if (errorData) {
				errMsg.textContent = errorData.errors[0].message;
			} else {
				errMsg.textContent = error.message;
			}
		}

		// Handle success
		if (response.ok) {
			const res = await response.json();

			// Clear form
			const form = document.querySelector("#postForm");
			form.reset();

			// Clear errors
			errContainer.classList.add("hidden");

			// Render post to DOM
			const postId = res.data.id;
			renderPost(postId);
		}
	} catch (error) {
		throw new Error(error);
	}
}
