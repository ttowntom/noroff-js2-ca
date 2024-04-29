import { updateProfile } from "../api/profile/update.mjs";

export function editProfile(profileData) {
	// Get the profile body elements
	const profileWrapper = document.querySelector("#profile");
	const profileBio = document.querySelector("#profileBio");
	const profileImage = document.querySelector("#profileImage");

	// Hide profile menu
	const userMenu = document.querySelector("#userMenuProfile");
	userMenu.classList.add("hidden");

	// Create container
	const container = document.createElement("div");
	container.classList.add("flex", "flex-col", "space-y-2");

	// Create profile name
	const profileName = document.createElement("h1");
	profileName.classList.add("text-3xl", "font-bold", "text-greenPrimary");
	profileName.textContent = profileData.name;
	container.append(profileName);

	// Create a textarea element
	// Create label
	const profileBioLabel = document.createElement("label");
	profileBioLabel.htmlFor = "body";
	profileBioLabel.textContent = "Profile bio text";
	profileBioLabel.setAttribute("maxlength", "100");
	profileBioLabel.classList.add("mt-2", "text-darkBlue", "dark:text-gray-200");
	container.append(profileBioLabel);

	const textarea = document.createElement("textarea");
	textarea.name = "body";
	textarea.classList.add(
		"w-full",
		"my-2",
		"p-3",
		"focus:outline-none",
		"dark:bg-slate-800",
		"text-darkBlue",
		"dark:text-gray-200"
	);
	textarea.value = profileBio.textContent;
	container.append(textarea);

	// Create profile image url input
	// Create label
	const profileImageLabel = document.createElement("label");
	profileImageLabel.htmlFor = "avatar";
	profileImageLabel.textContent = "Profile image URL";
	profileImageLabel.classList.add(
		"mt-2",
		"text-darkBlue",
		"dark:text-gray-200"
	);
	container.append(profileImageLabel);

	const profileImageInput = document.createElement("input");
	profileImageInput.type = "url";
	profileImageInput.name = "avatar";
	profileImageInput.classList.add(
		"w-full",
		"my-2",
		"p-3",
		"focus:outline-none",
		"dark:bg-slate-800",
		"text-darkBlue",
		"dark:text-gray-200"
	);
	profileImageInput.value = profileData.avatar.url;
	container.append(profileImageInput);

	// Create button container
	const buttonContainer = document.createElement("div");
	buttonContainer.classList.add("flex", "self-end", "space-x-2");

	// Create a cancel button
	const cancelButton = document.createElement("button");
	cancelButton.classList.add(
		"py-2",
		"px-5",
		"mt-3",
		"bg-red-500",
		"text-white",
		"font-bold",
		"rounded-full",
		"shadow-sm",
		"hover:bg-red-600",
		"dark:hover:bg-red-800"
	);
	cancelButton.textContent = "Cancel";
	buttonContainer.append(cancelButton);

	// Create a save button
	const saveButton = document.createElement("button");
	saveButton.classList.add(
		"py-2",
		"px-5",
		"mt-3",
		"bg-greenPrimary",
		"text-white",
		"font-bold",
		"rounded-full",
		"shadow-sm",
		"hover:bg-greenHover",
		"dark:hover:bg-greenHoverLight"
	);
	saveButton.textContent = "Update profile";
	textarea.after(saveButton);

	buttonContainer.append(saveButton);
	container.append(buttonContainer);

	profileWrapper.replaceWith(container);

	// Add listener to the cancel button
	cancelButton.addEventListener("click", () => {
		container.replaceWith(profileWrapper);
	});

	// Add listener to the save button
	saveButton.addEventListener("click", () => {
		// Update the profile
		updateProfile(profileData.name, {
			bio: textarea.value,
			avatar: {
				url: profileImageInput.value,
				alt: `${profileData.name}'s profile image`,
			},
		}).then((response) => {
			// Handle errors
			if (response.error) {
				throw new Error(response.error);
			}

			// Store the updated profile in local storage
			const profile = JSON.parse(localStorage.getItem("profile"));
			profile.bio = textarea.value;
			profile.avatar.url = profileImageInput.value;
			profile.avatar.alt = `${profileData.name}'s profile image`;
			localStorage.setItem("profile", JSON.stringify(profile));

			// Reload the profile page
			window.location.reload();
		});
	});
}
