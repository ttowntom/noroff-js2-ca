import { setRegistrationFormListener } from "./handlers/registration.mjs";

//////////////////////////////////////////////////////////////
import { themeSelector } from "./themeSelector.js";
import { userMenuProfile, closeUserMenuProfile } from "./userMenuProfile.js";
import { userMenuPost, closeUserMenuPost } from "./userMenuPost.js";

setRegistrationFormListener();
//////////////////////////////////////////////////////////////
// Call themeSelector function
themeSelector();

// Call userMenuProfile function
userMenuProfile();
// Close user menu when clicking outside of it
closeUserMenuProfile();

// Call userMenuPost function
userMenuPost();
// Close user menu when clicking outside of it
closeUserMenuPost();
