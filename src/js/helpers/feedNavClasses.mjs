export function feedNavClasses(activeLi, activeBtn, inactiveLi, inactiveBtn) {
	// Set active class
	// Add styles to li
	activeLi.classList.add("border-b-4", "border-greenPrimary");
	// Remove styles from li
	activeLi.classList.remove(
		"hover:border-greenHover",
		"dark:hover:border-greenHoverLight"
	);
	// Add styles to button
	activeBtn.classList.add(
		"hover:text-greenHover",
		"dark:hover:text-greenHoverLight"
	);
	// Remove styles from button
	activeBtn.classList.remove();

	// Set inactive class
	// Remove styles from li
	inactiveLi.classList.remove("border-b-4", "border-greenPrimary");
	// Add styles to li
	inactiveLi.classList.add(
		"hover:border-b-4",
		"hover:border-greenHover",
		"dark:hover:border-greenHoverLight"
	);
	// Remove styles from button
	inactiveBtn.classList.remove();
	// Add styles to button
	inactiveBtn.classList.add(
		"hover:text-greenHover",
		"dark:hover:text-greenHoverLight"
	);
}
