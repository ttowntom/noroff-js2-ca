import { setRegistrationFormListener } from "./handlers/registration.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";

import * as post from "./api/posts/index.mjs";

import { themeSelector } from "./ui/themeSelector.js";
import { userMenuProfile, closeUserMenuProfile } from "./ui/userMenuProfile.js";
import { userMenuPost, closeUserMenuPost } from "./ui/userMenuPost.js";

const path = location.pathname;

if (path === "/") {
	// Login page
	setLoginFormListener();
} else if (path === "/profile/registration/") {
	setRegistrationFormListener();
} else if (path === "/profile/") {
	// Set theme
	themeSelector();

	// Open/Close user menu on profile
	userMenuProfile();
	closeUserMenuProfile();
} else {
	// Set theme
	themeSelector();

	// Open/Close on posts
	userMenuPost();
	closeUserMenuPost();
}

// post.createPost({
// 	title: "Hello World again!",
// 	content: "Another post from the API!",
// });

// post.updatePost({
// 	id: 1271,
// 	title: "This was updated again!",
// 	body: "It's like magic!",
// });

// post.removePost(1269);

// post.getPost(1271).then(console.log);
