/**
 * Styles feed navigation elements based on active/inactive state
 * @param {HTMLLIElement} activeLi - The active list item
 * @param {HTMLButtonElement} activeBtn - The active button
 * @param {HTMLLIElement} inactiveLi - The inactive list item
 * @param {HTMLButtonElement} inactiveBtn - The inactive button
 * ``` js
 * const activeLi = document.querySelector(".active-li");
 * const activeBtn = document.querySelector(".active-btn");
 * const inactiveLi = document.querySelector(".inactive-li");
 * const inactiveBtn = document.querySelector(".inactive-btn");
 * feedNavClasses(activeLi, activeBtn, inactiveLi, inactiveBtn);
 * // activeLi and activeBtn will have green styles
 * // inactiveLi and inactiveBtn will have default styles
 * ```
 */

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
