export function commentFormTemplate() {
	// Create container
	const container = document.createElement("div");
	container.classList.add("flex", "flex-col", "space-y-2");

	// Create a textarea element
	const textarea = document.createElement("textarea");
	textarea.name = "body";
	textarea.classList.add(
		"w-full",
		"my-2",
		"p-3",
		"focus:outline-none",
		"dark:bg-slate-800",
		"text-darkBlue",
		"dark:text-gray-200"
	);
	textarea.placeholder = "Add a comment";

	container.append(textarea);

	// Create button container
	const buttonContainer = document.createElement("div");
	buttonContainer.classList.add(
		"flex",
		"flex-wrap",
		"md:flex-nowrap",
		"justify-end",
		"space-x-2"
	);

	// Create a cancel button
	const cancelButton = document.createElement("button");
	cancelButton.classList.add(
		"py-2",
		"px-5",
		"mt-3",
		"bg-red-500",
		"text-white",
		"font-bold",
		"rounded-full",
		"shadow-sm",
		"hover:bg-red-600",
		"dark:hover:bg-red-800"
	);
	cancelButton.textContent = "Cancel";
	buttonContainer.append(cancelButton);

	// Create a save button
	const saveButton = document.createElement("button");
	saveButton.classList.add(
		"py-2",
		"px-5",
		"mt-3",
		"bg-greenPrimary",
		"text-white",
		"font-bold",
		"rounded-full",
		"shadow-sm",
		"hover:bg-greenHover",
		"dark:hover:bg-greenHoverLight"
	);
	saveButton.textContent = "Add comment";
	textarea.after(saveButton);

	buttonContainer.append(saveButton);
	container.append(buttonContainer);

	// Create alert container
	const alertContainer = document.createElement("div");
	alertContainer.classList.add(
		"hidden",
		"w-full",
		"items-center",
		"my-2",
		"p-2",
		"text-darkBlue",
		"bg-red-300",
		"border",
		"border-red-600",
		"rounded-md"
	);
	alertContainer.setAttribute("role", "alert");

	// Create alert text
	const alertText = document.createElement("p");
	alertText.classList.add("text-left", "pl-2");
	alertContainer.append(alertText);

	return { container, textarea, saveButton, cancelButton, alertContainer };
}
