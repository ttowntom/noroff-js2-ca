import { updateProfile } from "../api/profile/update.mjs";
import { alertContainerTemplate } from "../helpers/alertContainer.mjs";
import { editProfileFormTemplate } from "../templates/editProfileForm.mjs";

export function editProfile(profileData) {
	// Get the profile body elements
	const profileWrapper = document.querySelector("#profile");
	const profileBio = document.querySelector("#profileBio");
	const profileImage = document.querySelector("#profileImage");

	// Hide profile menu
	const userMenu = document.querySelector("#userMenuProfile");
	userMenu.classList.add("hidden");

	const { container, saveButton, cancelButton, textarea, profileImageInput } =
		editProfileFormTemplate(profileData, profileBio);

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
				container.append(alertContainerTemplate("error", response.error));
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
