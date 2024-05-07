/**
 * Creates a container for an alert message
 * @param {string} mode - The mode of the alert message (error, success, info, warning)
 * @param {string} msg - The message to display in the alert container
 * @returns {HTMLDivElement} - The alert container element
 * ``` js
 * const alertContainer = alertContainerTemplate("error", "This is an error message");
 * document.body.appendChild(alertContainer);
 * ```
 */

export function alertContainerTemplate(mode, msg) {
	// Set mode variables
	let bgColor = "";
	let borderColor = "";
	let textColor = "";

	// Set mode variables based on mode
	if (mode === "error") {
		bgColor = "bg-red-300";
		borderColor = "border-red-600";
		textColor = "text-darkBlue";
	} else if (mode === "success") {
		bgColor = "bg-green-300";
		borderColor = "border-green-600";
		textColor = "text-darkBlue";
	} else if (mode === "info") {
		bgColor = "bg-blue-300";
		borderColor = "border-blue-600";
		textColor = "text-darkBlue";
	} else if (mode === "warning") {
		bgColor = "bg-yellow-300";
		borderColor = "border-yellow-600";
		textColor = "text-darkBlue";
	}

	// Create alert container
	const alertContainer = document.createElement("div");
	alertContainer.classList.add(
		"w-full",
		"items-center",
		"my-2",
		"p-2",
		textColor,
		bgColor,
		"border",
		borderColor,
		"rounded-md"
	);
	alertContainer.setAttribute("role", mode);

	// Create alert text
	const alertText = document.createElement("p");
	alertText.classList.add("text-left", "pl-2", textColor);
	alertText.textContent = msg;

	alertContainer.append(alertText);

	return alertContainer;
}
