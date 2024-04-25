const searchTerm = document.querySelector("#searchTerm");
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

	// Handle new search
	const searchString = searchTerm.value;
	searchTerm.addEventListener("input", () => {
		// Change icon and
		if (searchTerm.value !== searchString) {
			searchBtn.classList.remove(
				"bg-red-500",
				"hover:bg-red-800",
				"dark:bg-red-300",
				"dark:hover:bg-red-500"
			);
			searchBtn.classList.add(
				"bg-greenPrimary",
				"hover:bg-greenHover",
				"dark:hover:bg-greenHoverLight"
			);
			icon.classList.remove("fa-xmark");
			icon.classList.add("fa-search");
		}
	});

	// Redirect to feed on close
	searchBtn.addEventListener("click", () => {
		if (searchTerm.value === searchString || searchTerm.value === "") {
			location.href = "/feed/";
		}
	});
}
