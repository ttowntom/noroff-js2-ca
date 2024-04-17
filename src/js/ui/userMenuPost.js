const openBtn = document.querySelector("#user-menu-post-button");
const userMenu = document.querySelector("#user-menu-post");
const closeBtn = document.querySelector("#user-menu-post-close-btn");

export function userMenuPost() {
	openBtn.addEventListener("click", openMenu);
	closeBtn.addEventListener("click", closeMenu);

	function openMenu() {
		userMenu.classList.remove("hidden");
	}

	function closeMenu() {
		userMenu.classList.add("hidden");
	}
}

export function closeUserMenuPost() {
	// Clicks outside of the user menu will close it
	document.addEventListener("click", function (event) {
		if (!userMenu.contains(event.target) && !openBtn.contains(event.target)) {
			userMenu.classList.add("hidden");
		}
	});
}
