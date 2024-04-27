export function profileTemplate(profileData) {
	// Create profile container
	const profileContainer = document.createElement("div");
	profileContainer.classList.add("flex", "flex-col", "mt-3");

	const profile = document.createElement("div");
	profile.classList.add("flex", "relative");

	// Create profile image
	const profileImage = document.createElement("img");
	profileImage.src = profileData.avatar.url;
	profileImage.alt = profileData.name + " profile image";
	profileImage.classList.add("h-24", "w-24", "rounded-full");
	profile.append(profileImage);

	// Create profile meta data
	const profileMetaData = document.createElement("div");
	profileMetaData.classList.add("flex", "flex-col", "flex-grow", "ms-5");

	// User container
	const userContainer = document.createElement("div");
	userContainer.classList.add("flex", "justify-between");

	// Create profile name
	const profileName = document.createElement("h1");
	profileName.classList.add("text-3xl", "font-bold", "text-greenPrimary");
	profileName.textContent = profileData.name;
	userContainer.append(profileName);

	// Create edit profile button if profile owner is the same as the logged in user
	const userName = JSON.parse(localStorage.getItem("profile")).name;
	if (profileData.name === userName) {
		const editProfileButton = document.createElement("button");
		editProfileButton.id = "userMenuProfileButton";
		editProfileButton.ariaLabel = "Edit Profile";
		editProfileButton.classList.add(
			"self-start",
			"pe-4",
			"hover:text-greenPrimary"
		);
		editProfileButton.ariaLabel = "Edit Profile";

		// Add button icon
		const editProfileIcon = document.createElement("i");
		editProfileIcon.classList.add("fas", "fa-ellipsis-v");
		editProfileButton.append(editProfileIcon);

		userContainer.append(editProfileButton);

		// Create user menu
		const userMenu = document.createElement("nav");
		userMenu.id = "userMenuProfile";
		userMenu.classList.add(
			"hidden",
			"z-20",
			"absolute",
			"top-0",
			"right-0",
			"p-6",
			"pt-9",
			"pe-16",
			"bg-white",
			"border",
			"dark:bg-slate-900",
			"border-gray-200",
			"dark:border-gray-600",
			"rounded-md",
			"shadow-2xl"
		);

		// Create user menu close button
		const userMenuButton = document.createElement("button");
		userMenuButton.id = "userMenuProfileCloseBtn";
		userMenuButton.classList.add("absolute", "top-2", "right-2");
		userMenuButton.ariaLabel = "Close User Menu";

		// Add button icon
		const userMenuIcon = document.createElement("i");
		userMenuIcon.classList.add(
			"fa-solid",
			"fa-circle-xmark",
			"text-xl",
			"text-red-500",
			"dark:text-red-300",
			"hover:text-red-800",
			"dark:hover:text-red-500"
		);
		userMenuButton.append(userMenuIcon);
		userMenu.append(userMenuButton);

		// Create user menu list
		const userMenuList = document.createElement("ul");
		userMenuList.classList.add("space-y-3");

		// Create "Edit Profile" menu item
		const editProfileMenuItem = document.createElement("li");
		editProfileMenuItem.classList.add("flex", "items-center");
		//Create "Edit Profile" menu button
		const editProfileMenuButton = document.createElement("button");
		editProfileMenuButton.classList.add("flex", "items-center", "group");
		// Add button icon
		const editProfileMenuIcon = document.createElement("i");
		editProfileMenuIcon.classList.add(
			"fa-solid",
			"fa-pen-to-square",
			"text-greenPrimary",
			"group-hover:text-greenHover",
			"dark:group-hover:text-greenHoverLight"
		);
		editProfileMenuButton.append(editProfileMenuIcon);

		// Create button span
		const editProfileMenuText = document.createElement("span");
		editProfileMenuText.classList.add(
			"ms-2",
			"text-greenDark",
			"dark:text-gray-200",
			"group-hover:text-greenHover",
			"dark:group-hover:text-greenHoverLight"
		);
		editProfileMenuText.textContent = "Edit Profile";
		editProfileMenuButton.append(editProfileMenuText);
		editProfileMenuItem.append(editProfileMenuButton);
		userMenuList.append(editProfileMenuItem);

		// Create "Settings" menu item
		const settingsProfileMenuItem = document.createElement("li");
		settingsProfileMenuItem.classList.add("flex", "items-center");
		//Create "Settings" menu button
		const settingsProfileMenuButton = document.createElement("button");
		settingsProfileMenuButton.classList.add("flex", "items-center", "group");
		// Add button icon
		const settingsProfileMenuIcon = document.createElement("i");
		settingsProfileMenuIcon.classList.add(
			"fa-solid",
			"fa-gear",
			"text-greenPrimary",
			"group-hover:text-greenHover",
			"dark:group-hover:text-greenHoverLight"
		);
		settingsProfileMenuButton.append(settingsProfileMenuIcon);

		// Create button span
		const settingsProfileMenuText = document.createElement("span");
		settingsProfileMenuText.classList.add(
			"ms-2",
			"text-greenDark",
			"dark:text-gray-200",
			"group-hover:text-greenHover",
			"dark:group-hover:text-greenHoverLight"
		);
		settingsProfileMenuText.textContent = "Settings";
		settingsProfileMenuButton.append(settingsProfileMenuText);
		settingsProfileMenuItem.append(settingsProfileMenuButton);
		userMenuList.append(settingsProfileMenuItem);

		// Create "Toggle theme" menu item
		const themeProfileMenuItem = document.createElement("li");
		themeProfileMenuItem.classList.add("flex", "items-center");
		//Create "Toggle theme" menu button
		const themeProfileMenuButton = document.createElement("button");
		themeProfileMenuButton.id = "themeToggleBtn";
		themeProfileMenuButton.classList.add("flex", "items-center", "group");
		// Add dark icon
		const themeDarkProfileMenuIcon = document.createElement("i");
		themeDarkProfileMenuIcon.id = "themeDarkIcon";
		themeDarkProfileMenuIcon.classList.add(
			"fa-solid",
			"fa-moon-stars",
			"hidden",
			"text-greenPrimary",
			"group-hover:text-greenHover",
			"dark:group-hover:text-greenHoverLight"
		);
		themeProfileMenuButton.append(themeDarkProfileMenuIcon);
		// Add light icon
		const themeLightProfileMenuIcon = document.createElement("i");
		themeLightProfileMenuIcon.id = "themeLightIcon";
		themeLightProfileMenuIcon.classList.add(
			"fa-solid",
			"fa-sun",
			"hidden",
			"text-greenPrimary",
			"group-hover:text-greenHover",
			"dark:group-hover:text-greenHoverLight"
		);
		themeProfileMenuButton.append(themeLightProfileMenuIcon);

		// Create button span
		const themeProfileMenuText = document.createElement("span");
		themeProfileMenuText.id = "themeToggleText";
		themeProfileMenuText.classList.add(
			"ms-2",
			"text-greenDark",
			"dark:text-gray-200",
			"group-hover:text-greenHover",
			"dark:group-hover:text-greenHoverLight"
		);
		themeProfileMenuText.textContent = "Toggle theme";
		themeProfileMenuButton.append(themeProfileMenuText);
		themeProfileMenuItem.append(themeProfileMenuButton);
		userMenuList.append(themeProfileMenuItem);

		// Create "Log out" menu item
		const logOutProfileMenuItem = document.createElement("li");
		logOutProfileMenuItem.classList.add("flex", "items-center");
		//Create "Log out" menu button
		const LogOutProfileMenuButton = document.createElement("button");
		LogOutProfileMenuButton.id = "logout";
		LogOutProfileMenuButton.classList.add("flex", "items-center", "group");
		// Add button icon
		const logOutProfileMenuIcon = document.createElement("i");
		logOutProfileMenuIcon.classList.add(
			"fa-solid",
			"fa-right-from-bracket",
			"text-greenPrimary",
			"group-hover:text-greenHover",
			"dark:group-hover:text-greenHoverLight"
		);
		LogOutProfileMenuButton.append(logOutProfileMenuIcon);

		// Create button span
		const logOutProfileMenuText = document.createElement("span");
		logOutProfileMenuText.classList.add(
			"ms-2",
			"text-greenDark",
			"dark:text-gray-200",
			"group-hover:text-greenHover",
			"dark:group-hover:text-greenHoverLight"
		);
		logOutProfileMenuText.textContent = "Log out";
		LogOutProfileMenuButton.append(logOutProfileMenuText);
		logOutProfileMenuItem.append(LogOutProfileMenuButton);
		userMenuList.append(logOutProfileMenuItem);

		userMenu.append(userMenuList);
		profileMetaData.append(userMenu);

		// Add user menu button event listener - open user menu
		editProfileButton.addEventListener("click", () => {
			userMenu.classList.toggle("hidden");
		});

		// Add user menu close button event listener - close user menu
		userMenuButton.addEventListener("click", () => {
			userMenu.classList.add("hidden");
		});

		// Close user menu when clicking outside of the user menu
		document.addEventListener("click", function (event) {
			if (
				!userMenu.contains(event.target) &&
				!editProfileButton.contains(event.target)
			) {
				userMenu.classList.add("hidden");
			}
		});
	}

	profileMetaData.append(userContainer);

	// Create profile bio
	const bioText = profileData.bio
		? profileData.bio
		: `${profileData.name} has not added a bio yet.`;

	const profileBio = document.createElement("p");
	profileBio.classList.add(
		"text-md",
		"text-gray-500",
		"dark:text-gray-200",
		"font-light"
	);
	profileBio.textContent = bioText;
	profileMetaData.append(profileBio);

	// Create profile stats
	const profileStats = document.createElement("div");
	profileStats.classList.add("flex", "mt-4", "space-x-5");

	// Create followers count
	const followers = document.createElement("div");
	followers.classList.add("flex", "items-center");
	const followersCount = document.createElement("span");
	followersCount.classList.add("dark:text-gray-200", "font-bold");
	followersCount.textContent = profileData._count.followers;
	followers.append(followersCount);
	const followersText = document.createElement("span");
	followersText.classList.add("text-gray-500", "ms-1");
	followersText.textContent = "Followers";
	followers.append(followersText);
	profileStats.append(followers);

	// Create following count
	const following = document.createElement("div");
	following.classList.add("flex", "items-center");
	const followingCount = document.createElement("span");
	followingCount.classList.add("dark:text-gray-200", "font-bold");
	followingCount.textContent = profileData._count.following;
	following.append(followingCount);
	const followingText = document.createElement("span");
	followingText.classList.add("text-gray-500", "ms-1");
	followingText.textContent = "Following";
	following.append(followingText);
	profileStats.append(following);

	profileMetaData.append(profileStats);
	profile.append(profileMetaData);

	// Create user navigation container
	const userNavigationContainer = document.createElement("div");
	userNavigationContainer.classList.add(
		"flex",
		"flex-col-reverse",
		"md:flex-row",
		"md:justify-between",
		"mt-9"
	);

	// Create user navigation
	const userNavigation = document.createElement("nav");
	userNavigation.classList.add("flex-grow");
	//Create user navigation list
	const userNavigationList = document.createElement("ul");
	userNavigationList.classList.add(
		"flex",
		"space-x-6",
		"border-b",
		"border-greenPrimary"
	);
	// Create user navigation item: Posts
	const postsNavItem = document.createElement("li");
	postsNavItem.classList.add("border-b-4", "border-greenPrimary");
	// Create user navigation link
	const postsNavLink = document.createElement("a");
	postsNavLink.href = "#";
	postsNavLink.classList.add(
		"text-greenPrimary",
		"font-bold",
		"hover:text-greenHover",
		"dark:hover:text-greenHoverLight"
	);
	postsNavLink.textContent = "Posts";
	postsNavItem.append(postsNavLink);
	userNavigationList.append(postsNavItem);

	// Create user navigation item: Following
	const followingNavItem = document.createElement("li");
	followingNavItem.classList.add(
		"hover:border-b-4",
		"hover:border-greenHover",
		"dark:hover:border-greenHoverLight"
	);
	// Create user navigation link
	const followingNavLink = document.createElement("a");
	followingNavLink.href = "#";
	followingNavLink.classList.add(
		"text-greenPrimary",
		"font-bold",
		"hover:text-greenHover",
		"dark:hover:text-greenHoverLight"
	);
	followingNavLink.textContent = "Following";
	followingNavItem.append(followingNavLink);
	userNavigationList.append(followingNavItem);

	// Create user navigation item: Followers
	const followersNavItem = document.createElement("li");
	followersNavItem.classList.add(
		"hover:border-b-4",
		"hover:border-greenHover",
		"dark:hover:border-greenHoverLight"
	);
	// Create user navigation link
	const followersNavLink = document.createElement("a");
	followersNavLink.href = "#";
	followersNavLink.classList.add(
		"text-greenPrimary",
		"font-bold",
		"hover:text-greenHover",
		"dark:hover:text-greenHoverLight"
	);
	followersNavLink.textContent = "Followers";
	followersNavItem.append(followersNavLink);
	userNavigationList.append(followersNavItem);

	userNavigation.append(userNavigationList);
	userNavigationContainer.append(userNavigation);

	// Create follow button
	if (profileData.name !== userName) {
		const followButton = document.createElement("button");
		followButton.id = "followButton";
		followButton.classList.add(
			"mb-6",
			"-mt-3",
			"md:ms-6",
			"px-4",
			"py-2",
			"bg-greenPrimary",
			"hover:bg-white",
			"dark:hover:bg-slate-800",
			"text-white",
			"hover:text-greenPrimary",
			"dark:hover:text-greenHoverLight",
			"font-bold",
			"rounded-full",
			"border",
			"border-greenPrimary",
			"hover:shadow-sm"
		);
		followButton.textContent = "Follow";
		userNavigationContainer.append(followButton);
	}

	profileContainer.append(profile);
	profileContainer.append(userNavigationContainer);

	return profileContainer;
}

export function renderProfileTemplate(profileData, parent) {
	parent.append(profileTemplate(profileData));
}
