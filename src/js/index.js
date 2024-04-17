import { setRegistrationFormListener } from "./handlers/registration.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";
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
