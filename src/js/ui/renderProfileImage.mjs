export function renderProfileImage() {
	const user = JSON.parse(localStorage.getItem("profile"));

	const profileImage = document.querySelector("#profileImage");
	profileImage.src = user.avatar.url;
	profileImage.alt = `${user.name}'s profile image`;
}
