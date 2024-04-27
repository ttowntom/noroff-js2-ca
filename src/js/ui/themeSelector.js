export function themeSelector() {
	const themeToggleBtn = document.querySelector("#themeToggleBtn") || null;
	const themeToggleTxt = document.querySelector("#themeToggleText") || null;
	const themeToggleDarkIcon = document.querySelector("#themeDarkIcon") || null;
	const themeToggleLightIcon =
		document.querySelector("#themeLightIcon") || null;

	// If no toggle button, set theme and return
	if (!themeToggleBtn) {
		// Check if dark mode is set in local storage or by the browser
		if (
			localStorage.getItem("color-theme") === "dark" ||
			(!("color-theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			// Set dark mode
			document.documentElement.classList.add("dark");
		} else {
			// Set light mode
			document.documentElement.classList.remove("dark");
		}
		return;
	}

	// Check if dark mode is set in local storage or by the browser
	if (
		localStorage.getItem("color-theme") === "dark" ||
		(!("color-theme" in localStorage) &&
			window.matchMedia("(prefers-color-scheme: dark)").matches)
	) {
		// Set dark mode
		document.documentElement.classList.add("dark");

		// Show light icon
		themeToggleLightIcon.classList.remove("hidden");
		themeToggleTxt.textContent = "Toggle light mode";
	} else {
		// Set light mode
		document.documentElement.classList.remove("dark");

		// Show dark icon
		themeToggleDarkIcon.classList.remove("hidden");
		themeToggleTxt.textContent = "Toggle dark mode";
	}

	// Listen for toggle button click
	themeToggleBtn.addEventListener("click", toggleMode);
	function toggleMode() {
		// Toggle icon
		themeToggleDarkIcon.classList.toggle("hidden");
		themeToggleLightIcon.classList.toggle("hidden");

		// If is set in local storage
		if (localStorage.getItem("color-theme")) {
			// If light, make dark and save in local storage
			if (localStorage.getItem("color-theme") === "light") {
				document.documentElement.classList.add("dark");
				themeToggleTxt.textContent = "Toggle light mode";
				localStorage.setItem("color-theme", "dark");
			} else {
				// If dark, make light and save in local storage
				document.documentElement.classList.remove("dark");
				themeToggleTxt.textContent = "Toggle dark mode";
				localStorage.setItem("color-theme", "light");
			}
		} else {
			// If not set in local storage
			if (document.documentElement.classList.contains("dark")) {
				document.documentElement.classList.remove("dark");
				themeToggleTxt.textContent = "Toggle dark mode";
				localStorage.setItem("color-theme", "light");
			} else {
				document.documentElement.classList.add("dark");
				themeToggleTxt.textContent = "Toggle light mode";
				localStorage.setItem("color-theme", "dark");
			}
		}
	}
}
