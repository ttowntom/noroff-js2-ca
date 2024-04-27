import { setRegistrationFormListener } from "./handlers/registration.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
import { setLogoutListener } from "./handlers/logout.mjs";
import { setPostFormListener } from "./handlers/post.mjs";

import * as post from "./api/posts/index.mjs";
import * as profile from "./api/profile/index.mjs";
import * as templates from "./templates/index.mjs";

import { themeSelector } from "./ui/themeSelector.js";
import { renderProfileImage } from "./ui/renderProfileImage.mjs";
import { loadMorePosts } from "./handlers/postsLoadMore.mjs";
import { setSearchFormListener } from "./handlers/search.mjs";
import { getProfile } from "./api/profile/profileRead.mjs";

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
			// solve user name
			let user = urlParams.get("name");
			if (!user) {
				const loggedInUser = JSON.parse(localStorage.getItem("profile"));
				user = loggedInUser.name;
			}

			// Render user profile image
			renderProfileImage();

			// Render profile data
			async function renderProfile(user) {
				const profileContainer = document.querySelector("#user-info");
				const profileData = await getProfile(user);
				templates.renderProfileTemplate(profileData.data, profileContainer);

				// Call themeSelector() after the profile is rendered
				themeSelector();

				// Set logout listener
				setLogoutListener();
			}
			renderProfile(user);

			// Render posts
			async function renderPostsFromProfile() {
				const feedContainer = document.querySelector("#feed");
				const posts = await profile.getPostsFromProfile(user);
				posts.data.forEach((postData) => {
					templates.renderPostTemplate(postData, feedContainer);
				});
			}
			renderPostsFromProfile();

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
			renderPosts();

			// Set load more posts listener
			loadMorePosts();

			// Set post POST form listener
			setPostFormListener();

			// Set search form listener
			setSearchFormListener();

			// Render user profile image
			renderProfileImage();

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

			// Render user profile image
			renderProfileImage();

			break;

		default:
			break;
	}
}
