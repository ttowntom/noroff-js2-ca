import { setRegistrationFormListener } from "./handlers/registration.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
import { setLogoutListener } from "./handlers/logout.mjs";
import { setPostFormListener } from "./handlers/post.mjs";

import * as post from "./api/posts/index.mjs";
import * as profile from "./api/profile/index.mjs";
import * as templates from "./templates/index.mjs";

import { themeSelector } from "./ui/themeSelector.js";
import { userMenuProfile, closeUserMenuProfile } from "./ui/userMenuProfile.js";
import { renderProfileImage } from "./ui/renderProfileImage.mjs";
import { loadMorePosts } from "./handlers/postsLoadMore.mjs";
import { setSearchFormListener } from "./handlers/search.mjs";

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

			// Render posts
			async function renderPostsFromProfile() {
				const user = JSON.parse(localStorage.getItem("profile"));

				const feedContainer = document.querySelector("#feed");
				const posts = await profile.getPostsFromProfile(user.name);
				posts.data.forEach((postData) => {
					templates.renderPostTemplate(postData, feedContainer);
				});
			}
			renderPostsFromProfile();

			// Render user profile image
			renderProfileImage();

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
