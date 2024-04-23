const openBtn = document.querySelector("#user-menu-profile-button");
const userMenu = document.querySelector("#user-menu-profile");
const closeBtn = document.querySelector("#user-menu-profile-close-btn");

export function userMenuProfile() {
	// If no user menu, return
	if (!userMenu) return;

	openBtn.addEventListener("click", openMenu);
	closeBtn.addEventListener("click", closeMenu);

	function openMenu() {
		userMenu.classList.remove("hidden");
	}

	function closeMenu() {
		userMenu.classList.add("hidden");
	}
}

export function closeUserMenuProfile() {
	// If no user menu, return
	if (!userMenu) return;

	// Clicks outside of the user menu will close it
	document.addEventListener("click", function (event) {
		if (!userMenu.contains(event.target) && !openBtn.contains(event.target)) {
			userMenu.classList.add("hidden");
		}
	});
}
