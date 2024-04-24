export function renderProfileImage() {
	const user = JSON.parse(localStorage.getItem("profile"));

	const profileImage = document.querySelectorAll(".profileImage");

	profileImage.forEach((image) => {
		image.src = user.avatar.url;
		image.alt = `${user.name}'s profile image`;
	});
}
