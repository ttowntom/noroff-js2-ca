import { setRegistrationFormListener } from "./handlers/registration.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
import { setLogoutListener } from "./handlers/logout.mjs";
import { setPostFormListener } from "./handlers/post.mjs";

import * as post from "./api/posts/index.mjs";
import * as templates from "./templates/index.mjs";

import { themeSelector } from "./ui/themeSelector.js";
import { userMenuProfile, closeUserMenuProfile } from "./ui/userMenuProfile.js";

export default function router() {
	// Get current path
	const path = location.pathname;
	// Get url parameters
	const urlParams = new URLSearchParams(window.location.search);

	switch (path) {
		case "/":
			// Login page
			setLoginFormListener();
			break;
		case "/profile/registration/":
			// Registration page
			setRegistrationFormListener();
			break;
		case "/profile/":
			// Profile page
			// Set theme
			themeSelector();

			// Open/Close user menu on profile
			userMenuProfile();
			closeUserMenuProfile();

			// Set logout listener
			setLogoutListener();
			break;
		case "/feed/":
			// Feed page
			// Set theme
			themeSelector();

			// Render posts
			async function renderPosts() {
				const feedContainer = document.querySelector("#feed");
				const posts = await post.getPosts();
				posts.data.forEach((postData) => {
					templates.renderPostTemplate(postData, feedContainer);
				});
			}

			// Set post POST form listener
			setPostFormListener();

			renderPosts();
			break;
		case "/feed/post/":
			// Single post page
			// Set theme
			themeSelector();

			const postId = urlParams.get("id");

			// Render post
			async function renderPost() {
				const postContainer = document.querySelector("#post");
				const postData = await post.getPost(postId);
				templates.renderPostTemplate(postData.data, postContainer);
			}

			renderPost();

			break;

		default:
			break;
	}
}
