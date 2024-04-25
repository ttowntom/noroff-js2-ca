const searchBtn = document.querySelector("#searchBtn");
const icon = document.querySelector("#searchIcon");

export function searchRemove() {
	// Change styling
	searchBtn.classList.add(
		"bg-red-500",
		"hover:bg-red-800",
		"dark:bg-red-300",
		"dark:hover:bg-red-500"
	);
	searchBtn.classList.remove(
		"bg-greenPrimary",
		"hover:bg-greenHover",
		"dark:hover:bg-greenHoverLight"
	);

	// Change icon
	icon.classList.add("fa-xmark");
	icon.classList.remove("fa-search");

	// Redirect to feed on click
	searchBtn.addEventListener("click", () => {
		location.href = "/feed/";
	});
}
