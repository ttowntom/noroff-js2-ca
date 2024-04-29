export function renderProfileName() {
	const user = JSON.parse(localStorage.getItem("profile"));

	const profileName = document.querySelectorAll(".profileName");

	profileName.forEach((name) => {
		name.textContent = user.name;
	});
}
