export function setLogoutListener() {
	const logoutBtn = document.querySelector("#logout");

	if (logoutBtn) {
		logoutBtn.addEventListener("click", () => {
			// Remove token from local storage
			localStorage.removeItem("profile");
			localStorage.removeItem("token");
			// Redirect to login page
			window.location.href = "/";
		});
	}
}
